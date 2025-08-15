'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { BulkDeleteDigitalWebVisits } from '@/types/components';

import { getSummaryDigitalWebVisit } from '@/server/actions/digital-web-visits/get-summary-digital-web-visit';
import { bulkDeleteDigitalWebVisits } from '@/server/actions/digital-web-visits/bulk-delete-digital-web-visits';

const WebVisitsLists = () => {
  const { data: summaryWebVisit } = useQuery({
    queryKey: ['get-summary-digital-web-visits'],
    queryFn: async () => {
      const { data } = await getSummaryDigitalWebVisit();
      return data;
    },
  });

  const projectToRecordMap = useRef(new Map<string, any>());

  useEffect(() => {
    if (summaryWebVisit) {
      projectToRecordMap.current.clear();
      summaryWebVisit.forEach((record: any) => {
        const uniqueKey = `${record.project}-${record.date}`;
        projectToRecordMap.current.set(uniqueKey, record);
      });
    }
  }, [summaryWebVisit]);

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
      .filter(Boolean) as BulkDeleteDigitalWebVisits[];

    return bulkDeleteDigitalWebVisits({ items });
  };

  const dataWithUniqueIds = summaryWebVisit?.map((record: any) => ({
    ...record,
    uniqueId: `${record.project}-${record.date}`,
  }));

  return (
    <DataTable
      title="Digital Web Visit Mention"
      description="Monitor and analyze online mentions of your brand, products, or campaigns across social media, news outlets, blogs, and forums. Stay informed about public perception, track sentiment, and respond proactively with real-time digital mention insights."
      data={dataWithUniqueIds}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/web-visits/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project'],
      }}
      idAccessor="uniqueId"
      queryKey={['get-summary-digital-web-visits']}
    />
  );
};

export default WebVisitsLists;
