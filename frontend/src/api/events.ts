import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import type {
  DataEnvelope,
  EventDetail,
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
