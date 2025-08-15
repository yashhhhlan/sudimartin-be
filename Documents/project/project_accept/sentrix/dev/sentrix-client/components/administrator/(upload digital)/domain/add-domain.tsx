'use client';

import DomainForm from './domain-form';

import { createDigitalDomain } from '@/server/actions/digital-domains/create-digital-domain';

const AddDomain = () => {
  const handleSubmit = async ({ formData }: { formData: FormData }) => {
    return createDigitalDomain(formData);
  };

  return <DomainForm mode="create" onSubmit={handleSubmit} />;
};

export default AddDomain;
