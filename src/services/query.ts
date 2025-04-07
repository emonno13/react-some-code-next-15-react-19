import type { Post } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { http } from './http';

export const queries = {
  posts: {
    queryKey: ['posts'] as const,
    queryFn: async (): Promise<Post[]> => {
      return http.get<Post[]>('/posts');
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  },
};

export function useGetPosts() {
  return useQuery<Post[], Error>(queries.posts);
}
