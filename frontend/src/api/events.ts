import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { queryClient } from '@/lib/queryClient';
import type {
  DataEnvelope,
  EventDetail,
  EventInput,
  EventsListResponse,
  EventSummary,
  HomeEventsResponse,
} from '@/types';

export const eventKeys = {
  all: ['events'] as const,
  home: () => [...eventKeys.all, 'home'] as const,
  list: () => [...eventKeys.all, 'list'] as const,
  detail: (id: string | number) => [...eventKeys.all, 'detail', String(id)] as const,
};

/** Events starting soon, shown on the home page. */
export function useHomeEvents() {
  return useQuery({
    queryKey: eventKeys.home(),
    queryFn: async (): Promise<EventSummary[]> => {
      const { data } = await apiClient.get<HomeEventsResponse>('/events/home');
      return data.dataStarted ?? [];
    },
  });
}

/** Full event listing used by the search page. */
export function useEvents() {
  return useQuery({
    queryKey: eventKeys.list(),
    queryFn: async (): Promise<EventSummary[]> => {
      const { data } = await apiClient.get<EventsListResponse>('/events');
      return data.events ?? [];
    },
  });
}

/** Single event detail. */
export function useEventDetail(id: string | undefined) {
  return useQuery({
    queryKey: eventKeys.detail(id ?? ''),
    enabled: Boolean(id),
    queryFn: async (): Promise<EventDetail> => {
      const { data } = await apiClient.get<DataEnvelope<EventDetail>>(`/events/${id}`);
      return data.data;
    },
  });
}

/** Create a new event. Requires the user to be signed in. */
export function useCreateEvent() {
  return useMutation({
    mutationFn: async (payload: EventInput): Promise<EventDetail> => {
      const { data } = await apiClient.post<DataEnvelope<EventDetail>>('/events', payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}

/** Edit an existing event. Only the owner may do this. */
export function useUpdateEvent(id: string | number) {
  return useMutation({
    mutationFn: async (payload: EventInput): Promise<EventDetail> => {
      const { data } = await apiClient.put<DataEnvelope<EventDetail>>(`/events/${id}`, payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}
