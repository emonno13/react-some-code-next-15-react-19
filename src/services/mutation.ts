import { LoginCredentials, LoginResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { http } from './http';

export const mutations = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      return await http.post<LoginResponse>('/api/login', credentials);
    } catch (error) {
      throw new Error((error as Error).message || 'Login failed');
    }
  },
};

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (
      credentials: LoginCredentials
    ): Promise<LoginResponse> => {
      try {
        return await http.post<LoginResponse>('/api/login', credentials);
      } catch (error) {
        throw new Error((error as Error).message || 'Login failed');
      }
    },
  });
}
