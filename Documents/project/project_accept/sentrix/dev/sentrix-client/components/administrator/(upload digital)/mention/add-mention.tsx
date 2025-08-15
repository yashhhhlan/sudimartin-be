'use client';

import { createDigitalMention } from '@/server/actions/digital-mentions/create-digital-mention';

import MentionForm from './mention-form';

const AddMention = () => {
  const handleSubmit = async (formData: FormData) => {
    return createDigitalMention(formData);
  };

  return <MentionForm onSubmit={handleSubmit} />;
};

export default AddMention;
