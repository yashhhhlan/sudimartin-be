'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import IconLockDots from '../icon/icon-lock-dots';
import { showMessage } from '../toast';

import { verifyOTP } from '@/server/actions/auth/verify-otp';

import { setToken } from '@/utils/token';

const VerifyOTP = () => {
  const router = useRouter();
  const userId = useSearchParams().get('user-id');

  const [attemptCount, setAttemptCount] = useState(0);
  const [formData, setFormData] = useState({
    otp: '',
  });

  useEffect(() => {
    if (!userId) {
      showMessage('Invalid access. Please login again.', 'error');
      router.push('/auth/signin');
      return;
    }

    const mongoObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!mongoObjectIdRegex.test(userId)) {
      showMessage('Invalid user ID format. Please login again.', 'error');
      router.push('/auth/signin');
      return;
    }
  }, [userId, router]);

  const { mutate, isPending } = useMutation({
    mutationKey: ['verify-otp'],
    mutationFn: verifyOTP,
    onSuccess: ({ success, message, data }) => {
      if (!success) {
        const newCount = attemptCount + 1;
        setAttemptCount(newCount);

        if (newCount >= 3) {
          showMessage('Too many failed attempts. Please login again.', 'error');
          router.push('/auth/signin');
          return;
        }

        showMessage(message, 'error');
        return;
      }

      setToken(data?.accessToken);
      router.push('/dashboard');
      showMessage(message);
    },
    onError: (error: Error) => {
      const newCount = attemptCount + 1;
      setAttemptCount(newCount);

      if (newCount >= 3) {
        showMessage('Too many failed attempts. Please login again.', 'error');
        router.push('/auth/signin');
        return;
      }

      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setFormData({ otp: '' });
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

    if (attemptCount >= 3) {
      router.push('/auth/signin');
      return;
    }

    mutate({
      userId: userId as string,
      otp: formData.otp,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="otp">OTP</label>
        <div className="flex items-center gap-4">
          <div className="w-full relative text-white-dark">
            <input
              value={formData.otp}
              onChange={handleChange}
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter OTP"
              className="form-input ps-10 placeholder:text-white-dark"
              disabled={attemptCount >= 3}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <IconLockDots fill={true} />
            </span>
          </div>
        </div>
      </div>

      <button
        disabled={!formData.otp || isPending || attemptCount >= 3}
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        {attemptCount >= 3 ? 'Max Attempts Reached' : isPending ? 'Verifying...' : 'Verify'}
      </button>
    </form>
  );
};

export default VerifyOTP;
