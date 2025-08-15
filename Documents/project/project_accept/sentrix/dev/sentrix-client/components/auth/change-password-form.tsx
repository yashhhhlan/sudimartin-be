'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { showMessage } from '../toast';
import IconLockDots from '../icon/icon-lock-dots';

import { changePassword } from '@/server/actions/auth/change-password';

const ChangePasswordForm = () => {
  const router = useRouter();

  const token = useSearchParams().get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['change-password'],
    mutationFn: changePassword,
    onSuccess: ({ success, message, data }) => {
      if (!success) {
        router.refresh();

        showMessage(message, 'error');
        return;
      }

      router.push('/auth/signin');

      showMessage(message);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setFormData({
        newPassword: '',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      token: token as string,
      newPassword: formData.newPassword,
    });
  };
  return (
    <form className="space-y-5" onSubmit={handleForm}>
      <div>
        <label htmlFor="newPassword" className="dark:text-white">
          New Password
        </label>
        <div className="relative text-white-dark">
          <input
            value={formData.newPassword}
            onChange={handleChange}
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
            className="form-input ps-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
        </div>
      </div>
      <button
        disabled={isPending || !formData.newPassword}
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
