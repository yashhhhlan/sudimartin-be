'use server';

import { cookies } from 'next/headers';

interface SentimentSummaryTimelineRequest {
  project: string;
  startDate: string;
  endDate: string;
}

interface SentimentSummaryTimelineResponse {
  success: boolean;
  message: string;
  data: {
    labels: string[]
    positive: number[]
    negative: number[]
    neutral: number[]
  } | null;
}

export async function getSentimentSummaryTimeline(param: SentimentSummaryTimelineRequest): Promise<SentimentSummaryTimelineResponse> {
  try {
    const token = cookies().get('access-token')?.value;
    const params = new URLSearchParams({ ...param })

    const res = await fetch(`${process.env.BASE_URL}/sentiments/summary-timeline?${params.toString()}`, {
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
