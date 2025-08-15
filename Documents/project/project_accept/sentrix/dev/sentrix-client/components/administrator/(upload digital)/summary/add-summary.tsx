'use client';

import { createDigitalSummary } from '@/server/actions/digital-summaries/create-digital-summary';

import SummaryForm from './summary-form';

const AddSummary = () => {
  const handleSubmit = async ({ files }: { files: FormData }) => {
    return createDigitalSummary(files);
  };

  return <SummaryForm onSubmit={handleSubmit} />;
};

export default AddSummary;
