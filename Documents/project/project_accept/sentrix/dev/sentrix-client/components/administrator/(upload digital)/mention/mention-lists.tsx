'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { bulkDeleteDigitalMentions } from '@/server/actions/digital-mentions/bulk-delete-digital-mentions';
import { getSummaryDigitalMention } from '@/server/actions/digital-mentions/get-summary-digital-mention';

import { BulkDeleteDigitalMention } from '@/types/components';

const MentionLists = () => {
  const { data: summary } = useQuery({
    queryKey: ['get-summary-digital-mention'],
    queryFn: async () => {
      const { data } = await getSummaryDigitalMention();
      return data;
    },
  });

  const projectToRecordMap = useRef(new Map<string, any>());

  useEffect(() => {
    if (summary) {
      projectToRecordMap.current.clear();
      summary.forEach((record: any) => {
        const uniqueKey = `${record.project}-${record.date}`;
        projectToRecordMap.current.set(uniqueKey, record);
      });
    }
  }, [summary]);

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
      .filter(Boolean) as BulkDeleteDigitalMention[];

    return bulkDeleteDigitalMentions({ items });
  };

  const dataWithUniqueIds = summary?.map((record: any) => ({
    ...record,
    uniqueId: `${record.project}-${record.date}`,
  }));

  return (
    <DataTable
      title="Digital Mention"
      description="Monitor and analyze online mentions of your brand, products, or campaigns across social media, news outlets, blogs, and forums. Stay informed about public perception, track sentiment, and respond proactively with real-time digital mention insights."
      data={dataWithUniqueIds}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/mention/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project'],
      }}
      idAccessor="uniqueId"
      queryKey={['get-summary-digital-mention']}
    />
  );
};

export default MentionLists;
