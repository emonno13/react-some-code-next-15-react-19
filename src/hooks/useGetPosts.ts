'use client';

import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/post';

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://api.example.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export function useGetPosts() {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}