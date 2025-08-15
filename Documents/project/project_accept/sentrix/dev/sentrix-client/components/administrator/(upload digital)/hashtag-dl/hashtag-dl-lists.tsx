'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { BulkDeleteDigitalHashtagDL } from '@/types/components';

import { getSummaryDigitalHashtagDL } from '@/server/actions/digital-hashtag-dl/get-summary-digital-hashtag-dl';
import { bulkDeleteDigitalHashtagDL } from '@/server/actions/digital-hashtag-dl/bulk-delete-digital-hashtag-dl';

const HashtagDLLists = () => {
  const { data: summaryHashtagDL } = useQuery({
    queryKey: ['get-summary-digital-hashtag-dl'],
    queryFn: async () => {
      const { data } = await getSummaryDigitalHashtagDL();
      return data;
    },
  });

  const projectToRecordMap = useRef(new Map<string, any>());

  useEffect(() => {
    if (summaryHashtagDL) {
      projectToRecordMap.current.clear();
      summaryHashtagDL.forEach((record: any) => {
        const uniqueKey = `${record.project}-${record.date}`;
        projectToRecordMap.current.set(uniqueKey, record);
      });
    }
  }, [summaryHashtagDL]);

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
      .filter(Boolean) as BulkDeleteDigitalHashtagDL[];

    return bulkDeleteDigitalHashtagDL({ items });
  };

  const dataWithUniqueIds = summaryHashtagDL?.map((record: any) => ({
    ...record,
    uniqueId: `${record.project}-${record.date}`,
  }));

  return (
    <DataTable
      title="Digital Hashtag Mention"
      description="Monitor and analyze online mentions of your brand, products, or campaigns across social media, news outlets, blogs, and forums. Stay informed about public perception, track sentiment, and respond proactively with real-time digital mention insights."
      data={dataWithUniqueIds}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/hashtag-dl/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project'],
      }}
      idAccessor="uniqueId"
      queryKey={['get-summary-digital-hashtag-dl']}
    />
  );
};

export default HashtagDLLists;
