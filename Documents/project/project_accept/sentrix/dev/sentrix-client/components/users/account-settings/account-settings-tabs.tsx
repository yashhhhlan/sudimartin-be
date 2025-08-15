'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import Image from 'next/image';

import { showMessage } from '@/components/toast';
import IconCheckedBox from '@/components/icon/icon-checkedbox';
import IconCheckbox from '@/components/icon/icon-checkbox';
import ChangePassword from './change-password';
import UserTab from '@/components/user-tab';
import ProjectNameLists from './project-name/project-name-lists';

import { getCurrentUser } from '@/server/actions/users/get-current-user';
import { updateCurrentUser } from '@/server/actions/users/update-current-user';
import { getCurrentUserPermission } from '@/server/actions/permissions/get-current-user-permission';
import { getAllPermissions } from '@/server/actions/permissions/get-all-permissions';

import { queryClient } from '@/providers/query-provider';

import { Permission } from '@/types/components';

const AccountSettingsTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tabs, setTabs] = useState<string>(searchParams.get('tab') || 'info');

  const toggleTabs = (name: string) => {
    setTabs(name);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', name);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setTabs(tabFromUrl);
    }
  }, [searchParams]);

  const [inputData, setInputData] = useState({
    name: '',
    phone: '',
  });

  const { data: currentUser } = useQuery({
    queryKey: ['get-current-user'],
    queryFn: async () => {
      const { data } = await getCurrentUser();

      setInputData({
        name: data.name,
        phone: data.phone,
      });

      return data;
    },
    refetchOnWindowFocus: false,
  });

  const { data: currentUserPermission } = useQuery({
    queryKey: ['get-current-user-permission'],
    queryFn: async () => {
      const { data } = await getCurrentUserPermission();

      return data;
    },
    refetchOnWindowFocus: false,
  });

  const { data: permissions } = useQuery({
    queryKey: ['get-all-permissions'],
    queryFn: async () => {
      const { data } = await getAllPermissions();
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-current-user'],
    mutationFn: updateCurrentUser,
    onSuccess: ({ success, message }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      router.refresh();

      showMessage(message);

      queryClient.invalidateQueries({ queryKey: ['get-current-user'] });
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    const name = inputData.name || currentUser?.name || '';
    const phone = inputData.phone || currentUser?.phone || '';

    formData.append('name', name);
    formData.append('phone', phone);

    mutate(formData);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateImage } = useMutation({
    mutationKey: ['update-profile-image'],
    mutationFn: updateCurrentUser,
    onSuccess: ({ success, message }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      router.refresh();

      showMessage(message);

      queryClient.invalidateQueries({ queryKey: ['update-current-user'] });
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    updateImage(formData);
  };

  return (
    <div className="pt-5">
      <UserTab activeTabs={tabs} toggleTabs={toggleTabs} />

      {tabs === 'info' && (
        <div>
          <form className="mb-5 rounded-md border border-[#ebedf2] bg-white py-6 px-12  dark:border-[#191e3a] dark:bg-black">
            <h6 className="mb-5 text-lg font-bold">General Information</h6>
            <div className="flex flex-col sm:flex-row">
              <div className="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
                <div className="relative group cursor-pointer mx-auto w-fit" onClick={handleImageClick}>
                  {currentUser?.profileImageUrl ? (
                    <Image
                      src={process.env.NEXT_PUBLIC_BASE_URL + currentUser?.profileImageUrl}
                      alt="img"
                      className="size-20 rounded-full object-cover md:size-32"
                      width={320}
                      height={320}
                    />
                  ) : (
                    <Image
                      src="/assets/images/user-profile-vislog-plus.jpg"
                      alt="img"
                      className="size-20 rounded-full object-cover md:size-32"
                      width={320}
                      height={320}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white">Change</span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={inputData?.name || currentUser?.name}
                    onChange={handleChange}
                    placeholder="Jimmy Turner"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    value={currentUser?.email}
                    placeholder="jimmyturner@gmail.com"
                    className="form-input disabled:cursor-not-allowed bg-slate-100 text-gray-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    value={currentUser?.company}
                    placeholder="Hitek"
                    className="form-input disabled:cursor-not-allowed bg-slate-100 text-gray-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={inputData?.phone || currentUser?.phone}
                    onChange={handleChange}
                    placeholder="+6282..."
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="role">Role</label>
                  <input
                    id="role"
                    type="text"
                    value={currentUser?.roleId?.name}
                    placeholder="role"
                    className="form-input disabled:cursor-not-allowed bg-slate-100 text-gray-500"
                    disabled
                  />
                </div>
                <div className="sm:col-span-2">
                  <button onClick={handleSubmit} type="button" className="btn btn-primary" disabled={isPending}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
          <ChangePassword />
        </div>
      )}

      {tabs === 'features' && (
        <div className="w-1/2 bg-white rounded-md shadow-md py-6 px-12 space-y-6">
          <h1 className="font-bold text-lg">Menu Privileges</h1>
          <div className="flex gap-12">
            {permissions && currentUserPermission && (
              <>
                <div className="flex gap-6">
                  {/* Dashboard Section */}
                  <div className="flex flex-col gap-6">
                    <div className="space-y-3">
                      <h2 className="font-medium text-base">Dashboard</h2>
                      <div className="space-y-2">
                        {(permissions['Dashboard'] as Permission[])?.map((permission) => {
                          const isActive = currentUserPermission['Dashboard']?.some(
                            (p: Permission) => p._id === permission._id,
                          );
                          return (
                            <div key={permission._id} className="flex items-center gap-2">
                              {isActive ? <IconCheckedBox /> : <IconCheckbox />}
                              <span className={`${isActive ? 'text-primary' : 'text-gray-500 font-semibold'}`}>
                                {permission.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feature Section */}
                    <div className="space-y-3">
                      <h2 className="font-medium text-base">Feature</h2>
                      <div className="space-y-2">
                        {(permissions['Feature'] as Permission[])?.map((permission) => {
                          const isActive = currentUserPermission['Feature']?.some(
                            (p: Permission) => p._id === permission._id,
                          );
                          return (
                            <div key={permission._id} className="flex items-center gap-2">
                              {isActive ? <IconCheckedBox /> : <IconCheckbox />}
                              <span className={`${isActive ? 'text-primary' : 'text-gray-500 font-medium'}`}>
                                {permission.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {currentUserPermission?.['Administrator'] && (
                    // Administrator Section
                    <div className="space-y-3">
                      <h2 className="font-medium text-base">Administrator</h2>
                      <div className="space-y-2">
                        {(permissions['Administrator'] as Permission[])?.map((permission) => {
                          const isActive = currentUserPermission['Administrator']?.some(
                            (p: Permission) => p._id === permission._id,
                          );
                          return (
                            <div key={permission._id} className="flex items-center gap-2">
                              {isActive ? <IconCheckedBox /> : <IconCheckbox />}
                              <span className={`${isActive ? 'text-primary' : 'text-gray-500 font-medium'}`}>
                                {permission.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {tabs === 'project name' && <ProjectNameLists assignedProjects={currentUser?.assignedProjects} />}

      {tabs === 'report' && <div>Report</div>}

      {tabs === 'support' && <div>Support</div>}
    </div>
  );
};

export default AccountSettingsTabs;
