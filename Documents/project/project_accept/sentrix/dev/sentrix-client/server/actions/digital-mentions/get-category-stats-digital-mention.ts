'use server';

import { cookies } from 'next/headers';

export async function getCategoryStatsDigitalMention(startDate: string, endDate: string, project: string) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(
      `${process.env.BASE_URL}/digital-mentions/stats/categories?startDate=${startDate}&endDate=${endDate}&project=${project}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
