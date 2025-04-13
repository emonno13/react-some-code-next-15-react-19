import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Instead of using cookies().delete(), we'll use Set-Cookie header with Max-Age=0
    // to ensure better compatibility across environments

    // Create response object
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Set cookie with Max-Age=0 to expire it immediately
    response.headers.set(
      'Set-Cookie',
      'accessToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax' +
        (process.env.NODE_ENV === 'production' ? '; Secure' : '')
    );

    // Add cache control headers
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
