import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import type { Comment, DataEnvelope } from '@/types';

export const commentKeys = {
  all: ['comments'] as const,
};

export function useComments() {
  return useQuery({
    queryKey: commentKeys.all,
    queryFn: async (): Promise<Comment[]> => {
      const { data } = await apiClient.get<DataEnvelope<Comment[]>>('/comments');
      // newest first
      return [...(data.data ?? [])].reverse();
    },
  });
}

export interface NewComment {
  comment: string;
  eventId?: number;
  userId?: number;
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: NewComment): Promise<Comment> => {
      const { data } = await apiClient.post<DataEnvelope<Comment>>('/comments', payload);
      return data.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
  });
}
