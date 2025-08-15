'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { getSummaryDigitalEmotion } from '@/server/actions/digital-emotions/get-summary-digital-emotion';
import { bulkDeleteDigitalEmotion } from '@/server/actions/digital-emotions/bulk-delete-digital-emotion';

import { BulkDeleteDigitalEmotion } from '@/types/components';

const DigitalEmotionLists = () => {
  const { data: summaryDigitalEmotion } = useQuery({
    queryKey: ['get-summary-digital-emotion'],
    queryFn: async () => {
      const { data } = await getSummaryDigitalEmotion();
      return data;
    },
  });

  const projectToRecordMap = useRef(new Map<string, any>());

  useEffect(() => {
    if (summaryDigitalEmotion) {
      projectToRecordMap.current.clear();
      summaryDigitalEmotion.forEach((record: any) => {
        const uniqueKey = `${record.project}-${record.date}`;
        projectToRecordMap.current.set(uniqueKey, record);
      });
    }
  }, [summaryDigitalEmotion]);

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
      .filter(Boolean) as BulkDeleteDigitalEmotion[];

    return bulkDeleteDigitalEmotion({ items });
  };

  const dataWithUniqueIds = summaryDigitalEmotion?.map((record: any) => ({
    ...record,
    uniqueId: `${record.project}-${record.date}`,
  }));

  return (
    <DataTable
      title="Digital Emotion"
      description="Monitor and analyze online emotions of your brand, products, or campaigns across social media, news outlets, blogs, and forums. Stay informed about public perception, track sentiment, and respond proactively with real-time digital emotion insights."
      data={dataWithUniqueIds}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/emotion/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project'],
      }}
      idAccessor="uniqueId"
      queryKey={['get-summary-digital-emotion']}
    />
  );
};

export default DigitalEmotionLists;
