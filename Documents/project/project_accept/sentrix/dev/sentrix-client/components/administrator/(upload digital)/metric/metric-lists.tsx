'use client';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { getAllDigitalMetrics } from '@/server/actions/digital-metrics/get-all-digital-metrics';
import { bulkDeleteDigitalMetrics } from '@/server/actions/digital-metrics/bulk-delete-digital-metrics';

const MetricLists = () => {
  const { data: digitalMetrics } = useQuery({
    queryKey: ['get-all-digital-metrics'],
    queryFn: async () => {
      const { data } = await getAllDigitalMetrics();
      return data;
    },
  });

  return (
    <DataTable
      title="Digital Metric"
      description="Access key performance indicators (KPIs) and analytics to evaluate the effectiveness of your digital strategies. This feature provides detailed measurement of engagement, reach, conversions, and other critical metrics across platforms—empowering data-driven decisions and continuous optimization."
      data={digitalMetrics}
      columns={columns}
      addButtonText="Add Data"
      addButtonPath="/dashboard/administrator/upload-digital/metric/create"
      editPath="/dashboard/administrator/upload-digital/metric"
      onBulkDelete={async (ids) => bulkDeleteDigitalMetrics({ metricIds: ids })}
      filterConfig={{
        searchableFields: ['metric'],
      }}
      queryKey={['get-all-digital-metrics']}
    />
  );
};

export default MetricLists;
