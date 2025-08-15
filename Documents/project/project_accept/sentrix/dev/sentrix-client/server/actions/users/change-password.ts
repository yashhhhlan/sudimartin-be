'use server';

import { cookies } from 'next/headers';

interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export async function changePassword({ currentPassword, newPassword, confirmNewPassword }: ChangePasswordType) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(`${process.env.BASE_URL}/users/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    });

    const { success, message, data } = await res.json();

    if (!res.ok) {
      return {
        success,
        message,
        data: null,
      };
    }

    return {
      success,
      message,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Internal server error',
      data: null,
    };
  }
}
