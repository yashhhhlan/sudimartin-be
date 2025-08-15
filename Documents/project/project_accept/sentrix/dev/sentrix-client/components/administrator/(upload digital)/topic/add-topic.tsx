'use client';

import TopicForm from './topic-form';

import { createTopic } from '@/server/actions/topics/create-topic';

const AddTopic = () => {
  const handleSubmit = async ({ files }: { files: FormData }) => {
    return createTopic(files);
  };

  return <TopicForm onSubmit={handleSubmit} />;
};

export default AddTopic;
