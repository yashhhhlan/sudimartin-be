'use client';

import { createDigitalWebVisit } from '@/server/actions/digital-web-visits/create-digital-web-visit';

import WebVisitsForm from './web-visits-form';

const AddWebVisits = () => {
  const handleSubmit = async ({ files }: { files: FormData }) => {
    return createDigitalWebVisit(files);
  };

  return <WebVisitsForm onSubmit={handleSubmit} />;
};

export default AddWebVisits;
