import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate credentials
    if (email !== 'emonno13@gmail.com' || password !== '12345678') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate dummy access token
    const value = 'dummy_access_token_' + Date.now();

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('accessToken', value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const response = NextResponse.json({ success: true });
    response.headers.set(
      'Cache-Control',
      'no-store, must-revalidate, proxy-revalidate'
    );
    return response;
  } catch (error: unknown) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
