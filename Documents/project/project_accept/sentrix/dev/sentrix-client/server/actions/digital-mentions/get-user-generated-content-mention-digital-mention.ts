'use server';

import { cookies } from 'next/headers';

export async function getUserGeneratedContentMentionDigitalMention(
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

    if (domain && domain.length > 0) {
      domain.forEach((d) => params.append('domain', d));
    }

    const url = `${process.env.BASE_URL}/digital-mentions/user-generated-content?${params.toString()}`;

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
