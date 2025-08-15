'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ButtonAction from '@/components/button-action';
import FormInput from '@/components/form-input';
import Header from '@/components/header';
import { showMessage } from '@/components/toast';

import { DigitalMetricProps } from '@/types/components';

const MetricForm = ({ mode, initialData, metricId, onSubmit }: DigitalMetricProps) => {
  const router = useRouter();

  const [metric, setMetric] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setMetric(initialData.metric || '');
    }
  }, [initialData]);

  const { mutate, isPending } = useMutation({
    mutationKey: [mode === 'create' ? 'create-metric' : 'update-metric', metricId],
    mutationFn: onSubmit,
    onSuccess: ({ success, message, data }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      router.push(`/dashboard/administrator/upload-digital/metric`);
      showMessage(`Metric has been ${mode === 'create' ? 'created' : 'updated'}`);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setMetric('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'edit' && metricId) {
      mutate({ metricId, metric });
    } else {
      mutate({ metric });
    }
  };

  const isDisabled = mode === 'create' ? isPending || !metric : isPending || !metric;
  return (
    <div className="space-y-6">
      <Header
        className="font-semibold"
        title="Input Data"
        description={
          <>
            Please ensure all data is entered accurately and completely. Accurate data entry optimizes system
            performance, enhances analytical precision, and ensures the reliability of reports and insights generated.
          </>
        }
      />

      <div className="w-full bg-white rounded-md shadow-md p-6 space-y-6">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex gap-6">
            <FormInput
              label="Metric"
              value={metric}
              name="metric"
              onChange={(e) => setMetric(e.target.value)}
              placeholder="Input Metric"
              className="w-1/2"
            />
          </div>

          <ButtonAction isDisabled={isDisabled} mode={mode} />
        </form>
      </div>
    </div>
  );
};

export default MetricForm;
