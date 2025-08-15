'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EyeClosed } from 'lucide-react';

import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { showMessage } from '../toast';
import IconEye from '../icon/icon-eye';

import { loginUser } from '@/server/actions/auth/signin';

import { setToken } from '@/utils/token';

interface LoginFormData {
  email: string;
  password: string;
}

const SigninForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: loginUser,
    onSuccess: ({ success, message, data }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      // if (data?.requiresOTPVerification) {
      //   showMessage(message);
      //   router.push(`/auth/verify-otp?user-id=${data?.userId}`);
      //   return;
      // }

      setToken(data.accessToken);
      router.push('/dashboard/media-monitoring/overview');
      showMessage(message);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setFormData({
        email: '',
        password: '',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = formData.email && formData.password;

  return (
    <form className="space-y-5 dark:text-white" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email</label>
        <div className="relative text-white-dark">
          <input
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            className="form-input ps-10 placeholder:text-white-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="relative text-white-dark">
          <input
            value={formData.password}
            onChange={handleChange}
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            className="form-input ps-10 pe-10 placeholder:text-white-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
          <button
            type="button"
            className="absolute end-4 top-1/2 -translate-y-1/2 text-white-dark hover:text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={togglePasswordVisibility}
            disabled={isPending}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeClosed size={16} /> : <IconEye />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        disabled={!isFormValid || isPending}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default SigninForm;
