'use client';

import Header from '@/components/header';

interface ProjectNameListsProps {
  assignedProjects: { _id: string; name: string; mainKeywords: string[] }[];
}

const ProjectNameLists = ({ assignedProjects }: ProjectNameListsProps) => {
  const totalMainKeywords =
    assignedProjects?.reduce((total, project) => total + project.mainKeywords.filter((k) => k !== '-').length, 0) || 0;

  return (
    <div className="space-y-16 bg-white rounded-md py-6">
      <Header
        title="Project Name"
        description={
          <>
            Manage and track your projects. View details and available slots under your Project Name. You have used{' '}
            <strong>{totalMainKeywords}</strong> Keywords.
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 pl-12">
        {assignedProjects?.length > 0 ? (
          assignedProjects?.map((project: { _id: string; name: string }) => (
            <div
              key={project._id}
              className="bg-[#EEF1F7] text-[#888EA8] border border-[#E0E6ED] rounded-md py-2 px-4 font-semibold"
            >
              {project?.name}
            </div>
          ))
        ) : (
          <div className="text-[#888EA8] font-semibold">You have no project.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectNameLists;
