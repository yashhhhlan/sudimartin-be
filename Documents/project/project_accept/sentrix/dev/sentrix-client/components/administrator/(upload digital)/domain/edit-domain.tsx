'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import DomainForm from './domain-form';

import { getDigitalDomainById } from '@/server/actions/digital-domains/get-digital-domain-by-id';
import { updateDigitalDomainById } from '@/server/actions/digital-domains/update-digital-domain-by-id';

const EditDomain = () => {
  const { domainId } = useParams();

  const { data: digitalDomain, isLoading } = useQuery({
    queryKey: ['get-domain-by-id', domainId],
    queryFn: async () => {
      const { data } = await getDigitalDomainById({ domainId: domainId as string });
      return data;
    },
  });

  const handleSubmit = async ({ formData }: { formData: FormData }) => {
    return updateDigitalDomainById({ domainId: domainId as string, formData });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DomainForm mode="edit" initialData={digitalDomain} onSubmit={handleSubmit} />;
};

export default EditDomain;
