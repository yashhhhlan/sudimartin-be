'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import DomainForm from './metric-form';

import { getDigitalMetricById } from '@/server/actions/digital-metrics/get-digital-metric-by-id';
import { updateDigitalMetricById } from '@/server/actions/digital-metrics/update-digital-metric-by-id';

const EditMetric = () => {
  const { metricId } = useParams();

  const { data: digitalMetric, isLoading } = useQuery({
    queryKey: ['get-metric-by-id', metricId],
    queryFn: async () => {
      const { data } = await getDigitalMetricById({ metricId: metricId as string });
      return data;
    },
  });

  const handleSubmit = async ({ metric }: { metric: string }) => {
    return updateDigitalMetricById({ metricId: metricId as string, metric });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DomainForm mode="edit" initialData={digitalMetric} onSubmit={handleSubmit} />;
};

export default EditMetric;
