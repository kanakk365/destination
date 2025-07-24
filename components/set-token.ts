// app/actions/set-token.ts
'use server';

import { cookies } from 'next/headers';

export async function setssoToken(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    localStorage.setItem("accesstoken",token);
    return { success: true };
  } catch (error) {
    console.error('Error setting cookie:', error);
    return { success: false, error: 'Failed to set cookie' };
  }
}