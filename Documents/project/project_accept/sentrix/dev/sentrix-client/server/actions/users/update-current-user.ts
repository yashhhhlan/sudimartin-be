'use server';

import { cookies } from 'next/headers';

export async function updateCurrentUser(formData: FormData) {
  try {
    const token = cookies().get('access-token')?.value;
    const isImageUpload = formData.has('image');

    const res = await fetch(`${process.env.BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        ...(isImageUpload ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
      },
      body: isImageUpload
        ? formData
        : JSON.stringify({
            name: formData.get('name'),
            phone: formData.get('phone'),
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
      message: error.message || 'Internal server error',
      data: null,
    };
  }
}
