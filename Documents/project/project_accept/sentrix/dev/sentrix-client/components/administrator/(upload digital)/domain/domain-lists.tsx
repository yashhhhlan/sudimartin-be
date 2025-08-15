'use client';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { getAllDigitalDomains } from '@/server/actions/digital-domains/get-all-digital-domains';
import { bulkDeleteDigitalDomain } from '@/server/actions/digital-domains/bulk-delete-digital-domain';

const DomainLists = () => {
  const { data: digitalDomains } = useQuery({
    queryKey: ['get-all-digital-domains'],
    queryFn: async () => {
      const { data } = await getAllDigitalDomains();
      return data;
    },
  });

  return (
    <DataTable
      title="Digital Domains"
      description="Access a comprehensive directory of digital domains relevant to your industry or organization. This centralized list helps manage, monitor, and evaluate domain assets, including websites, platforms, and digital properties, ensuring streamlined oversight and strategic alignment across your digital presence."
      data={digitalDomains}
      columns={columns}
      addButtonText="Add Data"
      addButtonPath="/dashboard/administrator/upload-digital/domain/create"
      editPath="/dashboard/administrator/upload-digital/domain"
      onBulkDelete={async (ids) => bulkDeleteDigitalDomain({ digitalDomainIds: ids })}
      filterConfig={{
        searchableFields: ['name'],
      }}
      queryKey={['get-all-digital-domains']}
    />
  );
};

export default DomainLists;
