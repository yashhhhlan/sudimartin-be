'use client';

import PopMentionForm from './pop-mention-form';

import { createDigitalPopMention } from '@/server/actions/digital-pop-mentions/create-digital-pop-mention';

const AddPopMention = () => {
  const handleSubmit = async ({ files }: { files: FormData }) => {
    return createDigitalPopMention(files);
  };

  return <PopMentionForm onSubmit={handleSubmit} />;
};

export default AddPopMention;
