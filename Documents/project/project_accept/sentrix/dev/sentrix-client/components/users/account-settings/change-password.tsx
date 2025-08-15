'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { changePassword } from '@/server/actions/users/change-password';

import { showMessage } from '@/components/toast';

const ChangePassword = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['change-password'],
    mutationFn: changePassword,
    onSuccess: ({ success, message }) => {
      if (!success) {
        router.refresh();

        showMessage(message, 'error');
        return;
      }

      showMessage(message);

      router.refresh();
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    });
  };

  return (
    <form className="rounded-md border border-[#ebedf2] bg-white py-6 px-12 dark:border-[#191e3a] dark:bg-black">
      <h6 className="mb-5 text-lg font-bold">Change Password</h6>

      <div className="flex flex-col space-y-4">
        <div className="w-1/3">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current password"
            className="form-input"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New password"
            className="form-input"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="form-input"
          />
        </div>
        <div className="mt-3 sm:col-span-2">
          <button
            onClick={handleSubmit}
            disabled={isPending || !formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword}
            type="button"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
