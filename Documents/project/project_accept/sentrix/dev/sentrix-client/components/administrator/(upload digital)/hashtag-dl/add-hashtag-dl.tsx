'use client';

import HashtagDLForm from './hashtag-dl-form';

import { createDigitalHashtagDL } from '@/server/actions/digital-hashtag-dl/create-digital-hashtag-dl';

const AddHashtagDL = () => {
  const handleSubmit = async ({ files }: { files: FormData }) => {
    return createDigitalHashtagDL(files);
  };

  return <HashtagDLForm onSubmit={handleSubmit} />;
};

export default AddHashtagDL;
