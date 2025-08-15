'use server';

import { cookies } from 'next/headers';

export async function createTopic(formData: FormData) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(`${process.env.BASE_URL}/topics`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
