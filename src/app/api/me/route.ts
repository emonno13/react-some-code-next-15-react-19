import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('Get me', request);
  try {
    // Get the access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    console.log('accessToken', accessToken);
    // Check if token exists
    if (!accessToken || !accessToken.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real app, you would validate the token here
    // For this example, we'll just check if it starts with "dummy_access_token_"
    if (!accessToken.value.startsWith('dummy_access_token_')) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Return user data
    return NextResponse.json({ name: 'Khanh', age: 28 });
  } catch (error: unknown) {
    console.error('Get me error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
