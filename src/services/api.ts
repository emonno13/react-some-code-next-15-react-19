// Client-side API utilities
import { LoginResponse, User } from '@/types/auth';
import { http } from './http';

export async function getMe(): Promise<User> {
  return http.get<User>('/api/me');
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  return http.post<LoginResponse>('/api/login', { email, password });
}

export async function logout(): Promise<void> {
  return http.post('/api/logout', {});
}
