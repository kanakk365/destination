// actions/set-token.ts
'use server';

import { cookies } from 'next/headers';
// import {  NextResponse } from 'next/server';
export async function setssoToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return '/sso'
}
