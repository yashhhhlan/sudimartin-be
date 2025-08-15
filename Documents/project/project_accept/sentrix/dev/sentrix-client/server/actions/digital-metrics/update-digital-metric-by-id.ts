'use server';

import { cookies } from 'next/headers';

interface UpdateDigitalMetricProps {
  metricId: string;
  metric: string;
}

export async function updateDigitalMetricById({ metricId, metric }: UpdateDigitalMetricProps) {
  try {
    const token = cookies().get('access-token')?.value;

    const res = await fetch(`${process.env.BASE_URL}/digital-metrics/${metricId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ metric }),
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
