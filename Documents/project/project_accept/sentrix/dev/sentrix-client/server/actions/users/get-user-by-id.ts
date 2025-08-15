'use server';

import { cookies } from 'next/headers';

export async function getUserById(userId: string) {
    try {
        const token = cookies().get('access-token')?.value;

        const res = await fetch(`${process.env.BASE_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}
