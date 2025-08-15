'use server';

import { cookies } from 'next/headers';

interface EmotionSummaryTimelineRequest {
  project: string;
  startDate: string;
  endDate: string;
}

interface EmotionSummaryTimelineResponse {
  success: boolean;
  message: string;
  data: {
    labels: string[];
    sedihValue: number[];
    kagumValue: number[];
    marahValue: number[];
    tidakSukaValue: number[];
    takutValue: number[];
    sukaValue: number[];
    netralValue: number[];
  } | null;
}

export async function getEmotionSummaryTimeline(
  param: EmotionSummaryTimelineRequest,
): Promise<EmotionSummaryTimelineResponse> {
  try {
    const token = cookies().get('access-token')?.value;
    const params = new URLSearchParams({ ...param });

    const res = await fetch(`${process.env.BASE_URL}/emotions/summary-timeline?${params.toString()}`, {
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
