import { User } from '@/types/auth';
import { cookies } from 'next/headers';
import { http } from './http';

export async function getServerSideMe(): Promise<User> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  return http.get<User>('/api/me', {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
}
