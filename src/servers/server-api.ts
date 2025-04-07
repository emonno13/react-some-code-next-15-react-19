import { cookies } from 'next/headers';

export async function getServerSideMe() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/me`,
    {
      cache: 'no-store',
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    }
  );

  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}
