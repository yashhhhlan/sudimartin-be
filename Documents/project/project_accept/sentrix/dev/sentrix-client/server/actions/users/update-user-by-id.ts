'use server';

import { cookies } from 'next/headers';

import { EditUserType } from '@/types/components';

export async function updateUserById(formData: EditUserType) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(`${process.env.BASE_URL}/users/${formData.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
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
      message: error.message || 'Internal server error',
      data: null,
    };
  }
}
