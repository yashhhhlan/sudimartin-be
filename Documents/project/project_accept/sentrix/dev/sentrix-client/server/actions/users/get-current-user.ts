'use server';

import { cookies } from 'next/headers';

export async function getCurrentUser() {
    try {
        const token = cookies().get('access-token')?.value;

        const res = await fetch(`${process.env.BASE_URL}/users/me`, {
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
