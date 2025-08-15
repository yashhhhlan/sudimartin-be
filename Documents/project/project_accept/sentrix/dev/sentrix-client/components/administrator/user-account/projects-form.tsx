import { memo, useEffect } from 'react';

import FormSelect from '@/components/form-select';
import Header from '@/components/header';

import { CreateUserType, EditUserType } from '@/types/components';

interface ProjectsFormProps {
  formData: CreateUserType | EditUserType;
  projects: any[];
  onChange: (updates: Partial<CreateUserType | EditUserType>) => void;
  currentRoleName?: string;
}

const ProjectsForm = memo(({ formData, projects, onChange, currentRoleName }: ProjectsFormProps) => {
  const isAdmin = currentRoleName?.toLowerCase() === 'admin';
  const usedSlots = formData.assignedProjects?.filter((id) => id !== '').length || 0;

  useEffect(() => {
    if (isAdmin && projects?.length > 0 && (!formData.assignedProjects || formData.assignedProjects.length === 0)) {
      const allProjectIds = projects.map((project) => project._id);
      onChange({ assignedProjects: allProjectIds });
    }
  }, [isAdmin, projects, formData.assignedProjects, onChange]);

  const handleProjectChange = (index: number, value: string) => {
    const newAssignedProjects = [...(formData.assignedProjects || [])];
    newAssignedProjects[index] = value || '';
    onChange({ assignedProjects: newAssignedProjects });
  };

  const handleRemoveProject = (index: number) => {
    const newAssignedProjects = formData.assignedProjects?.filter((_, i) => i !== index);
    onChange({ assignedProjects: newAssignedProjects });
  };

  const handleAddProject = () => {
    onChange({
      assignedProjects: [...(formData.assignedProjects || []), ''],
    });
  };

  const getAvailableOptions = (currentSelection?: string) => {
    return (
      projects
        ?.filter((project) => !formData.assignedProjects?.includes(project._id) || project._id === currentSelection)
        .map((project) => ({
          value: project._id,
          label: project.name,
        })) || []
    );
  };

  return (
    <div className="flex flex-col space-y-8 w-full max-w-5xl bg-white rounded-md py-6">
      <Header
        title="Project Name"
        description={
          isAdmin ? (
            <>
              <strong>Akses Admin:</strong> Semua proyek akan ditampilkan secara default, tetapi Anda dapat mengubahnya
              sesuai kebutuhan.
            </>
          ) : (
            <>
              Kelola proyek Anda. Anda telah menggunakan <strong>{usedSlots}</strong> kata kunci.
            </>
          )
        }
      />

      {isAdmin && (
        <div className="bg-blue-50 border max-w-3xl border-blue-200 rounded-md p-3 mx-12">
          <p className="text-sm text-blue-700">
            <strong>Akses Admin:</strong> Semua proyek akan ditampilkan secara default. Anda dapat menambah, menghapus,
            atau mengubah assignments.
          </p>
        </div>
      )}

      <div className="space-y-4 max-w-3xl mx-12">
        {formData.assignedProjects?.map((selectedProject, index) => {
          const availableOptions = getAvailableOptions(selectedProject);

          return (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <FormSelect
                  label=""
                  placeholder={isAdmin ? `Project ${index + 1}` : 'Select data'}
                  data={availableOptions}
                  value={selectedProject}
                  onChange={(value) => handleProjectChange(index, value)}
                />
              </div>

              {(formData.assignedProjects?.length || 0) > 1 && (
                <button type="button" onClick={() => handleRemoveProject(index)} className="btn btn-danger btn-sm">
                  Remove
                </button>
              )}
            </div>
          );
        })}

        <button type="button" onClick={handleAddProject} className="btn btn-primary btn-sm">
          Add New
        </button>
      </div>
    </div>
  );
});

ProjectsForm.displayName = 'ProjectsForm';
export default ProjectsForm;
