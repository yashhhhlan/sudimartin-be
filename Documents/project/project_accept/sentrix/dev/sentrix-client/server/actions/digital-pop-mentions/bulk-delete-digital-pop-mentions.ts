'use server';

import { cookies } from 'next/headers';

import { BulkDeleteDigitalPopMentionsProps } from '@/types/components';

export async function bulkDeleteDigitalPopMentions({ items }: BulkDeleteDigitalPopMentionsProps) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(`${process.env.BASE_URL}/digital-pop-mentions/bulk-delete`, {
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
