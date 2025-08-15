'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { getSummaryDigitalPopMentions } from '@/server/actions/digital-pop-mentions/get-summary-digital-pop-mentions';
import { bulkDeleteDigitalPopMentions } from '@/server/actions/digital-pop-mentions/bulk-delete-digital-pop-mentions';

import { BulkDeleteDigitalPopMention } from '@/types/components';

const PopMentionLists = () => {
  const { data: summaryPopMention } = useQuery({
    queryKey: ['get-summary-digital-pop-mentions'],
    queryFn: async () => {
      const { data } = await getSummaryDigitalPopMentions();
      return data;
    },
  });

  const projectToRecordMap = useRef(new Map<string, any>());

  useEffect(() => {
    if (summaryPopMention) {
      projectToRecordMap.current.clear();
      summaryPopMention.forEach((record: any) => {
        const uniqueKey = `${record.project}-${record.date}`;
        projectToRecordMap.current.set(uniqueKey, record);
      });
    }
  }, [summaryPopMention]);

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
      .filter(Boolean) as BulkDeleteDigitalPopMention[];

    return bulkDeleteDigitalPopMentions({ items });
  };

  const dataWithUniqueIds = summaryPopMention?.map((record: any) => ({
    ...record,
    uniqueId: `${record.project}-${record.date}`,
  }));

  return (
    <DataTable
      title="Digital Popular Mention"
      description="Monitor and analyze online mentions of your brand, products, or campaigns across social media, news outlets, blogs, and forums. Stay informed about public perception, track sentiment, and respond proactively with real-time digital mention insights."
      data={dataWithUniqueIds}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/pop-mention/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project'],
      }}
      idAccessor="uniqueId"
      queryKey={['get-summary-digital-pop-mentions']}
    />
  );
};

export default PopMentionLists;
