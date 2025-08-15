'use client';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { getAllProjects } from '@/server/actions/projects/get-all-projects';
import { bulkDeleteProject } from '@/server/actions/projects/bulk-delete-project';

const ProjectNameLists = () => {
  const { data } = useQuery({
    queryKey: ['get-all-projects'],
    queryFn: async () => {
      const { data } = await getAllProjects();
      return data;
    },
  });

  return (
    <DataTable
      title="Project Name"
      description="Easily categorize and track digital projects using specific keywords. This feature enables you to organize initiatives based on relevant themes, topics, or campaign goals, making it simple to search, filter, and analyze projects based on keyword relevance and performance."
      data={data}
      columns={columns}
      addButtonText="Add Data"
      addButtonPath="/dashboard/administrator/upload-digital/project-name/create"
      editPath="/dashboard/administrator/upload-digital/project-name"
      showHeader={false}
      onBulkDelete={async (ids) => bulkDeleteProject({ projectIds: ids })}
      filterConfig={{
        searchableFields: ['name', 'mainKeywords'],
      }}
      queryKey={['get-all-projects']}
    />
  );
};

export default ProjectNameLists;
