'use client';

import { useMutation } from '@tanstack/react-query';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  error?: string;
}

async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  return response.json();
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
  });
}
