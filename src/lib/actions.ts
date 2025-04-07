'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function logout() {
  // Remove the access token cookie
  (await cookies()).delete('accessToken');

  // Revalidate all pages that depend on authentication state
  revalidatePath('/');
  revalidatePath('/me');

  return { success: true };
}
