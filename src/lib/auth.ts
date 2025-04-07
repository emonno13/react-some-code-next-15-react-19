import { cookies } from 'next/headers';

export async function getAuthStatus() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  return {
    isAuthenticated: Boolean(accessToken?.value),
  };
}
