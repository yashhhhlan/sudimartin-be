'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { BulkDeleteDigitalPopAccountDL } from '@/types/components';

import { getSummaryDigitalPopAccountDL } from '@/server/actions/digital-pop-account-dl/get-summary-digital-pop-account-dl';
import { bulkDeleteDigitalPopAccountDL } from '@/server/actions/digital-pop-account-dl/bulk-delete-digital-pop-account-dl';

const PopAccountDLLists = () => {
  const { data: summaryDigitalPopAccountDL } = useQuery({
    queryKey: ['get-summary-digital-pop-account-dl'],
    queryFn: async () => {
      const { data } = await getSummaryDigitalPopAccountDL();
      return data;
    },
  });

  const projectToRecordMap = useRef(new Map<string, any>());

  useEffect(() => {
    if (summaryDigitalPopAccountDL) {
      projectToRecordMap.current.clear();
      summaryDigitalPopAccountDL.forEach((record: any) => {
        const uniqueKey = `${record.project}-${record.date}`;
        projectToRecordMap.current.set(uniqueKey, record);
      });
    }
  }, [summaryDigitalPopAccountDL]);

  const handleBulkDelete = async (selectedIds: string[]) => {
    const items = selectedIds
      .map((selectedId) => {
        const record = projectToRecordMap.current.get(selectedId);

        if (!record) {
          console.error(`Record not found for id: ${selectedId}`);
          return null;
        }

        return {
          date: record.date,
          project: record.project,
        };
      })
      .filter(Boolean) as BulkDeleteDigitalPopAccountDL[];

    return bulkDeleteDigitalPopAccountDL({ items });
  };

  const dataWithUniqueIds = summaryDigitalPopAccountDL?.map((record: any) => ({
    ...record,
    uniqueId: `${record.project}-${record.date}`,
  }));

  return (
    <DataTable
      title="Digital Popular Account Mention"
      description="Monitor and analyze online mentions of your brand, products, or campaigns across social media, news outlets, blogs, and forums. Stay informed about public perception, track sentiment, and respond proactively with real-time digital mention insights."
      data={dataWithUniqueIds}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/pop-account-dl/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project'],
      }}
      idAccessor="uniqueId"
      queryKey={['get-summary-digital-pop-account-dl']}
    />
  );
};

export default PopAccountDLLists;
