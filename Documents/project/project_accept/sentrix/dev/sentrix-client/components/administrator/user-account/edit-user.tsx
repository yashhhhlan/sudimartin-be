'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { getAllPermissions } from '@/server/actions/permissions/get-all-permissions';
import { getAllRoles } from '@/server/actions/roles/get-all-roles';
import { getUserById } from '@/server/actions/users/get-user-by-id';
import { updateUserById } from '@/server/actions/users/update-user-by-id';
import { getAllProjects } from '@/server/actions/projects/get-all-projects';

import { showMessage } from '@/components/toast';
import UserTab from '../../user-tab';
import PermissionsForm from './permissions-form';
import PersonalInfoForm from './personal-info-form';
import ProjectsForm from './projects-form';

import { ROLE, USER_TAB } from '@/types/constant';
import { EditUserType } from '@/types/components';

const INITIAL_EDIT_FORM_DATA: EditUserType = {
  userId: '',
  roleId: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  status: 'active',
  expiredDate: new Date(),
  assignedProjects: [''],
};

const EditUser = () => {
  const router = useRouter();
  const { userId } = useParams();

  const [activeTab, setActiveTab] = useState<string>('info');
  const [formData, setFormData] = useState<EditUserType>(INITIAL_EDIT_FORM_DATA);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [previousRoleId, setPreviousRoleId] = useState<string>('');

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['get-user-by-id', userId],
    queryFn: async () => {
      const { data } = await getUserById(userId as string);
      return data;
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

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
    if (user && userId) {
      setFormData((prev) => ({
        ...prev,
        userId: userId as string,
        roleId: user.roleId._id || '',
        name: user.name || '',
        email: user.email || '',
        company: user.company || '',
        phone: user.phone || '',
        status: user.status || 'active',
        expiredDate: user.expiredDate ? new Date(user.expiredDate) : new Date(),
        assignedProjects: user.assignedProjects?.map((project: any) =>
          typeof project === 'string' ? project : project._id,
        ) || [''],
      }));

      setSelectedPermissions(
        user.permissions?.map((permission: any) => (typeof permission === 'string' ? permission : permission._id)) ??
          [],
      );

      setPreviousRoleId(user.roleId._id || '');
    }
  }, [user, userId]);

  useEffect(() => {
    if (formData.roleId && roles && permissions && formData.roleId !== previousRoleId) {
      const selectedRole = roles.find((role: any) => role.id === formData.roleId);

      if (selectedRole) {
        if (selectedRole.name === ROLE.ADMIN || selectedRole.name === 'Admin') {
          selectAllPermissions();
        } else if (selectedRole.name === ROLE.USER || selectedRole.name === 'User') {
          clearAllPermissions();
        }
      }

      setPreviousRoleId(formData.roleId);
    }
  }, [formData.roleId, roles, permissions, previousRoleId]);

  const selectAllPermissions = useCallback(() => {
    if (permissions) {
      const allPermissionIds: string[] = [];

      Object.values(permissions).forEach((permissionGroup: any) => {
        permissionGroup.forEach((permission: any) => {
          allPermissionIds.push(permission._id);
        });
      });

      setSelectedPermissions(allPermissionIds);
    }
  }, [permissions]);

  const clearAllPermissions = useCallback(() => {
    setSelectedPermissions([]);
  }, []);

  const handleFormChange = useCallback((updates: Partial<EditUserType>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handlePermissionChange = useCallback((permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
    );
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.name || !formData.email || !formData.roleId) {
      showMessage('Please fill in all required fields', 'error');
      return false;
    }

    const selectedRole = roles?.find((role: { id: string }) => role.id === formData.roleId);
    if (selectedRole?.name === ROLE.USER && selectedPermissions.length === 0) {
      showMessage('Please select at least one permission', 'error');
      return false;
    }

    return true;
  }, [formData, roles, selectedPermissions]);

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUserById,
    onSuccess: ({ success, message }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      showMessage(message);
      router.push('/dashboard/administrator/user-account');
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
  });

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const filteredProjects = formData.assignedProjects?.filter((id) => id !== '') || [];

    const payload = {
      ...formData,
      permissions: selectedPermissions,
      assignedProjects: filteredProjects,
    };

    updateUserMutation(payload);
  }, [formData, selectedPermissions, validateForm, updateUserMutation]);

  const getCurrentRoleName = useCallback(() => {
    const currentRole = roles?.find((role: any) => role.id === formData.roleId);
    return currentRole?.name || '';
  }, [roles, formData.roleId]);

  const isFormValid = formData.name && formData.email && formData.roleId;
  const isLoading = userLoading || permissionsLoading || rolesLoading || projectsLoading;

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-semibold text-lg">Edit User</h1>
        <p className="text-gray-600">Update user account information, permissions, and project assignments.</p>
      </div>

      <UserTab activeTabs={activeTab} toggleTabs={setActiveTab} />

      <div className="flex gap-4">
        {activeTab === USER_TAB.INFO && (
          <PersonalInfoForm
            formData={formData as EditUserType}
            roles={roles}
            onChange={handleFormChange}
            isEditMode={true}
          />
        )}

        {activeTab === USER_TAB.FEATURES && (
          <PermissionsForm
            permissions={permissions}
            selectedPermissions={selectedPermissions}
            onPermissionChange={handlePermissionChange}
            currentRoleName={getCurrentRoleName()}
            onSelectAllPermissions={selectAllPermissions}
          />
        )}

        {activeTab === USER_TAB.PROJECT_NAME && (
          <ProjectsForm
            formData={formData}
            projects={projects}
            onChange={handleFormChange}
            currentRoleName={getCurrentRoleName()}
          />
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={handleSubmit} type="button" className="btn btn-primary" disabled={!isFormValid || isPending}>
          {isPending ? 'Updating...' : 'Save'}
        </button>

        <button onClick={() => router.back()} type="button" className="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUser;
