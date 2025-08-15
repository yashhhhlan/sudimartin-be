'use server';

import { cookies } from 'next/headers';

import { BulkDeleteDigitalHashtagDLProps } from '@/types/components';

export async function bulkDeleteDigitalHashtagDL({ items }: BulkDeleteDigitalHashtagDLProps) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(`${process.env.BASE_URL}/digital-hashtag-dl/bulk-delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
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
