'use client';

import { createDigitalMetric } from '@/server/actions/digital-metrics/create-digital-metric';

import MetricForm from './metric-form';

const AddMetric = () => {
  const handleSubmit = async ({ metric }: { metric: string }) => {
    return createDigitalMetric({ metric });
  };

  return <MetricForm mode="create" onSubmit={handleSubmit} />;
};

export default AddMetric;
