'use server';

import { cookies } from 'next/headers';

interface UpdateDigitalDomainById {
  domainId: string;
  formData: FormData;
}

export async function updateDigitalDomainById({ domainId, formData }: UpdateDigitalDomainById) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(`${process.env.BASE_URL}/digital-domains/${domainId}`, {
      method: 'PATCH',
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
