'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { FilterField } from '@/components/sidebar-filter';
import { columns } from './columns';

import { BulkDeleteDigitalSummaries } from '@/types/components';

import { getSummaryDigitalSummary } from '@/server/actions/digital-summaries/get-summary-digital-summary';
import { bulkDeleteDigitalSummaries } from '@/server/actions/digital-summaries/bulk-delete-digital-summaries';
import { getAllProjects } from '@/server/actions/projects/get-all-projects';

const SummaryLists = () => {
  const { data: summaryDigitalSummary } = useQuery({
    queryKey: ['get-summary-digital-summary'],
    queryFn: async () => {
      const { data } = await getSummaryDigitalSummary();
      return data;
    },
  });

  const { data: projects } = useQuery({
    queryKey: ['get-all-projects'],
    queryFn: async () => {
      const { data } = await getAllProjects();
      return data;
    },
  });

  const projectToRecordMap = useRef(new Map<string, any>());

  useEffect(() => {
    if (summaryDigitalSummary) {
      projectToRecordMap.current.clear();
      summaryDigitalSummary.forEach((record: any) => {
        const uniqueKey = `${record.project}-${record.date}`;
        projectToRecordMap.current.set(uniqueKey, record);
      });
    }
  }, [summaryDigitalSummary]);

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
      .filter(Boolean) as BulkDeleteDigitalSummaries[];

    return bulkDeleteDigitalSummaries({ items });
  };

  const dataWithUniqueIds = summaryDigitalSummary?.map((record: any) => ({
    ...record,
    uniqueId: `${record.project}-${record.date}`,
  }));

  const projectOptions = projects?.map((project: { name: string }) => ({
    value: project.name,
    label: project.name,
  }));

  const sidebarFields: FilterField[] = [
    {
      id: 'date',
      label: 'Date',
      type: 'daterange',
      accessor: 'date',
      defaultValue: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
    },
    {
      id: 'project',
      label: 'Project Name',
      type: 'multiselect',
      options: projectOptions,
      accessor: 'project',
    },
  ];

  return (
    <DataTable
      title="Digital Summary"
      description="Get an overview of your digital strategy’s effectiveness with a snapshot of key performance metrics. This feature aggregates data from various digital channels to provide a high-level summary of reach, engagement, conversions, and overall performance, helping you assess success and identify areas for improvement."
      data={dataWithUniqueIds}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/summary/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project'],
        sidebarFields,
      }}
      idAccessor="uniqueId"
      defaultSort={{
        columnAccessor: 'date',
        direction: 'desc',
      }}
      queryKey={['get-summary-digital-summary']}
    />
  );
};

export default SummaryLists;
