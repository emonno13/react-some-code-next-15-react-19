// Client-side API utilities

export async function getMe() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/me`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}
