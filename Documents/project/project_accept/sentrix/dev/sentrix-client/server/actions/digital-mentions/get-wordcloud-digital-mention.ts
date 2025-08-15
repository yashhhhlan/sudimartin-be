'use server';

import { cookies } from 'next/headers';

export async function getWordcloudMentionDigitalMention(
  startDate: string,
  endDate: string,
  project: string,
  domain?: string[],
) {
  try {
    const token = cookies().get('access-token')?.value;

    const params = new URLSearchParams();
    params.append('startDate', startDate);
    params.append('endDate', endDate);
    params.append('project', project);

    const url = `${process.env.BASE_URL}/digital-mentions/wordcloud?${params.toString()}`;

    const res = await fetch(url, {
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
