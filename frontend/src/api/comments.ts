import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import type { Comment, DataEnvelope } from '@/types';

export const commentKeys = {
  all: ['comments'] as const,
  forEvent: (eventId?: number) => [...commentKeys.all, { eventId }] as const,
};

/** Comments for a single event (or all comments when no eventId is given). */
export function useComments(eventId?: number) {
  return useQuery({
    queryKey: commentKeys.forEvent(eventId),
    queryFn: async (): Promise<Comment[]> => {
      const { data } = await apiClient.get<DataEnvelope<Comment[]>>('/comments', {
        params: eventId ? { eventId } : undefined,
      });
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
