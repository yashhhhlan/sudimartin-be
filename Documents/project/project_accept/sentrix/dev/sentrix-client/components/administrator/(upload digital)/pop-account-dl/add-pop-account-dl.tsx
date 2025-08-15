'use client';

import { createDigitalPopAccountDL } from '@/server/actions/digital-pop-account-dl/create-digital-pop-account-dl';

import PopAccountDLForm from './pop-account-dl-form';

const AddPopAccountDL = () => {
  const handleSubmit = async ({ files }: { files: FormData }) => {
    return createDigitalPopAccountDL(files);
  };

  return <PopAccountDLForm onSubmit={handleSubmit} />;
};

export default AddPopAccountDL;
