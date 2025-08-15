'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getAllPermissions } from '@/server/actions/permissions/get-all-permissions';
import { getAllRoles } from '@/server/actions/roles/get-all-roles';
import { createUser } from '@/server/actions/users/create-user';
import { getAllProjects } from '@/server/actions/projects/get-all-projects';

import { showMessage } from '@/components/toast';
import UserTab from '../../user-tab';
import PermissionsForm from './permissions-form';
import ProjectsForm from './projects-form';
import PersonalInfoForm from './personal-info-form';

import { ROLE, USER_TAB } from '@/types/constant';
import { CreateUserType } from '@/types/components';

export const INITIAL_FORM_DATA: CreateUserType = {
  roleId: '',
  name: '',
  email: '',
  password: '',
  company: '',
  phone: '',
  status: 'active',
  permissions: [],
  expiredDate: new Date(),
  assignedProjects: [''],
};

const AddUser = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [activeTab, setActiveTab] = useState<string>('info');
  const [formData, setFormData] = useState<CreateUserType>(INITIAL_FORM_DATA);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { data: permissions, isLoading: permissionsLoading } = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const { data } = await getAllPermissions();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data } = await getAllRoles();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await getAllProjects();
      return data;
    },
  });

  useEffect(() => {
    const selectedRole = roles?.find((role: { _id: string }) => role._id === formData.roleId);
    const isAdmin = selectedRole?.name?.toLowerCase() === 'admin';

    const updates: Partial<CreateUserType> = {};

    if (isAdmin) {
      updates.expiredDate = new Date('2099-12-31');

      if (permissions) {
        const allPermissionIds = Object.values(permissions)
          .flat()
          .map((p: any) => p._id);
        updates.permissions = allPermissionIds;
        setSelectedPermissions(allPermissionIds);
      }

      if (projects?.length > 0) {
        updates.assignedProjects = projects.map((project: any) => project._id);
      }
    } else {
      updates.accountLicense = new Date();
      updates.dataPeriod = {
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
      updates.assignedProjects = [''];
      updates.permissions = [];
      setSelectedPermissions([]);
    }

    if (Object.keys(updates).length > 0) {
      setFormData((prev) => ({ ...prev, ...updates }));
    }
  }, [formData.roleId, roles, permissions, projects]);

  const selectedRole = roles?.find((role: { id: string }) => role.id === formData.roleId);
  const currentRoleName = selectedRole?.name;

  const handleSelectAllPermissions = useCallback(() => {
    if (permissions) {
      const allPermissionIds = Object.values(permissions)
        .flat()
        .map((p: any) => p._id);
      setSelectedPermissions(allPermissionIds);
      setFormData((prev) => ({ ...prev, permissions: allPermissionIds }));
    }
  }, [permissions]);

  const handleFormChange = useCallback((updates: Partial<CreateUserType>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handlePermissionChange = useCallback((permissionId: string) => {
    setSelectedPermissions((prev) => {
      const newPermissions = prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId];

      setFormData((prevForm) => ({
        ...prevForm,
        permissions: newPermissions,
      }));

      return newPermissions;
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setSelectedPermissions([]);
    setActiveTab('info');
  }, []);

  const validateForm = useCallback(() => {
    if (formData.password.length < 6) {
      showMessage('Password must be at least 6 characters', 'error');
      return false;
    }

    const selectedRole = roles?.find((role: { id: string }) => role.id === formData.roleId);
    if (selectedRole?.name === ROLE.USER && selectedPermissions.length === 0) {
      showMessage('Please select at least one permission', 'error');
      return false;
    }

    return true;
  }, [formData, roles, selectedPermissions]);

  const { mutate: createUserMutation, isPending } = useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUser,
    onSuccess: async ({ success, message, data }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      router.push('/dashboard/administrator/user-account');
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: resetForm,
  });

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const filteredProjects = formData.assignedProjects?.filter((id) => id !== '') || [];

    const payload = {
      ...formData,
      permissions: selectedPermissions,
      assignedProjects: filteredProjects,
    };

    createUserMutation(payload);
  }, [formData, selectedPermissions, validateForm, createUserMutation]);

  const isFormValid = formData.name && formData.email && formData.password && formData.roleId;
  const isLoading = permissionsLoading || rolesLoading || projectsLoading;
  const isProcessing = isPending;

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const getButtonText = () => {
    if (isPending) return 'Creating User...';
    return 'Save';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-semibold text-lg">Add User</h1>
        <p className="text-gray-600">Create a new user account with appropriate permissions and project assignments.</p>
      </div>

      <UserTab activeTabs={activeTab} toggleTabs={setActiveTab} />

      <form ref={formRef} className="flex gap-4">
        {activeTab === USER_TAB.INFO && (
          <PersonalInfoForm formData={formData} roles={roles} onChange={handleFormChange} />
        )}

        {activeTab === USER_TAB.FEATURES && (
          <PermissionsForm
            permissions={permissions}
            selectedPermissions={selectedPermissions}
            onPermissionChange={handlePermissionChange}
            currentRoleName={currentRoleName}
            onSelectAllPermissions={handleSelectAllPermissions}
          />
        )}

        {activeTab === USER_TAB.PROJECT_NAME && (
          <ProjectsForm
            formData={formData}
            projects={projects}
            onChange={handleFormChange}
            currentRoleName={currentRoleName}
          />
        )}
      </form>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          type="button"
          className="btn btn-primary"
          disabled={!isFormValid || isProcessing}
        >
          {getButtonText()}
        </button>

        <button onClick={() => router.back()} disabled={isProcessing} type="button" className="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUser;
