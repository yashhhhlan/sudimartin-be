'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { FilterField } from '@/components/sidebar-filter';
import { columns } from './columns';

import { getAllTopics } from '@/server/actions/topics/get-all-topics';
import { bulkDeleteTopics } from '@/server/actions/topics/bulk-delete-topics';

import { getAllProjects } from '@/server/actions/projects/get-all-projects';

const TopicLists = () => {
  const { data: topics } = useQuery({
    queryKey: ['get-all-topics'],
    queryFn: async () => {
      const { data } = await getAllTopics();
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
    if (topics) {
      projectToRecordMap.current.clear();
      topics.forEach((record: any) => {
        projectToRecordMap.current.set(record._id, record);
      });
    }
  }, [topics]);

  const handleBulkDelete = async (selectedIds: string[]) => {
    return bulkDeleteTopics({ topicIds: selectedIds });
  };

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
      accessor: 'project.name',
    },
  ];

  return (
    <DataTable
      title="Topic Analysis"
      description="Explore and track key digital topics or themes relevant to your brand, audience, or industry. This feature helps you identify trending subjects, monitor conversations, and optimize content strategies by understanding the latest interests and discussions across digital platforms."
      data={topics}
      columns={columns}
      addButtonText="Upload"
      addButtonPath="/dashboard/administrator/upload-digital/topic/create"
      editPath=""
      onBulkDelete={handleBulkDelete}
      filterConfig={{
        searchableFields: ['project.name'],
        sidebarFields,
      }}
      idAccessor="_id"
      queryKey={['get-all-topics']}
    />
  );
};

export default TopicLists;
