'use client';

import ProjectForm from './project-form';

import { createProject } from '@/server/actions/projects/create-project';

const AddProjectName = () => {
  const handleSubmit = async ({ formData }: { formData: FormData }) => {
    return createProject(formData);
  };

  return (
    <ProjectForm
      mode="create"
      title="Input Data"
      onSubmit={handleSubmit}
      submitButtonText="Save Project"
      successMessage="Project has been created"
    />
  );
};

export default AddProjectName;
