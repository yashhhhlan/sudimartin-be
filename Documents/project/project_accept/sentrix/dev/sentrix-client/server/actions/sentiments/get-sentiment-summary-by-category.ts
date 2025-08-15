'use server';

import { cookies } from 'next/headers';

interface SentimentSummaryByCategoryRequest {
  project: string;
  startDate: string;
  endDate: string;
}

interface SentimentByCategory {
  category: string;
  labels: ['Positif', 'Negatif', 'Netral'];
  series: [number, number, number];
}

type SentimentSummaryByCategoryResponse = {
  success: boolean;
  message: string;
  data: SentimentByCategory[] | null;
};

export async function getSentimentSummaryByCategory(
  param: SentimentSummaryByCategoryRequest,
): Promise<SentimentSummaryByCategoryResponse> {
  try {
    const token = cookies().get('access-token')?.value;
    const params = new URLSearchParams({ ...param });

    const res = await fetch(`${process.env.BASE_URL}/sentiments/summary-category?${params.toString()}`, {
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
