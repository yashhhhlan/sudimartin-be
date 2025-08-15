'use client';

import DigitalEmotionForm from './digital-emotion-form';

import { createDigitalEmotion } from '@/server/actions/digital-emotions/create-digital-emotion';

const AddDigitalEmotion = () => {
  const handleSubmit = async ({ files }: { files: FormData }) => {
    return createDigitalEmotion(files);
  };

  return <DigitalEmotionForm onSubmit={handleSubmit} />;
};

export default AddDigitalEmotion;
