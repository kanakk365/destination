// frontend-app2/app/api/set-sso-token/route.ts
'use server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ detail: 'Token missing' }, { status: 400 });
  }

  try {
    // Set HttpOnly cookie for the current domain (localhost:3001) [1, 2]
    const cookieStore = await cookies();
    cookieStore.set('accessToken', token, {
      httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    console.log("Done")
    return NextResponse.json({ message: 'Token set successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error setting SSO token:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}