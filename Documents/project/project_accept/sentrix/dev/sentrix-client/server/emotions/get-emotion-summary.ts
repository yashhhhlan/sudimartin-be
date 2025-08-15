'use server';

import { cookies } from 'next/headers';

interface EmotionSummaryRequest {
  project: string;
  startDate: string;
  endDate: string;
}

interface EmotionSummaryResponse {
  success: boolean;
  message: string;
  data: {
    labels: string[];
    series: number[];
  } | null;
}

export async function getEmotionSummary(param: EmotionSummaryRequest): Promise<EmotionSummaryResponse> {
  try {
    const token = cookies().get('access-token')?.value;
    const params = new URLSearchParams({ ...param });

    const res = await fetch(`${process.env.BASE_URL}/emotions/summary?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
