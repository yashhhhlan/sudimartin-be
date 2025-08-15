'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import ProjectForm from './project-form';

import { getProjectById } from '@/server/actions/projects/get-project-by-id';
import { updateProjectById } from '@/server/actions/projects/update-project-by-id';

const EditProjectName = () => {
  const { projectNameId } = useParams();

  const { data: projectData, isLoading } = useQuery({
    queryKey: ['get-project-by-id', projectNameId],
    queryFn: async () => {
      const { data } = await getProjectById({ projectId: projectNameId as string });
      return data;
    },
  });

  const handleSubmit = async ({ formData }: { formData: FormData }) => {
    return updateProjectById({ projectId: projectNameId as string, formData });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectForm
      mode="edit"
      title="Edit Project Name"
      initialData={projectData}
      projectId={projectNameId as string}
      onSubmit={handleSubmit}
      submitButtonText="Edit Project"
      successMessage="Project has been updated"
    />
  );
};

export default EditProjectName;
