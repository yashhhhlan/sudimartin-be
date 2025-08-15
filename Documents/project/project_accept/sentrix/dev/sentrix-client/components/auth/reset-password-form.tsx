'use client';

import { resetPassword } from '@/server/actions/auth/reset-password';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import IconMail from '@/components/icon/icon-mail';
import { showMessage } from '../toast';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: resetPassword,
    onSuccess: ({ success, message, data }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      showMessage(message);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setFormData({
        email: '',
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
      email: formData.email,
    });
  };
  return (
    <form className="space-y-5" onSubmit={handleForm}>
      <div>
        <label htmlFor="email" className="dark:text-white">
          Email
        </label>
        <div className="relative text-white-dark">
          <input
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            className="form-input ps-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
      </div>
      <button
        disabled={isPending || !formData.email}
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        RECOVER
      </button>
    </form>
  );
};

export default ResetPasswordForm;
