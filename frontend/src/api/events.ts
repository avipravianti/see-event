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

/** Build multipart form data so the optional image file can be uploaded. */
function toEventFormData(payload: EventInput): FormData {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('time', payload.time);
  formData.append('dateValue', payload.dateValue);
  formData.append('category', payload.category);
  formData.append('detail', payload.detail);
  if (payload.image) {
    formData.append('image', payload.image);
  }
  return formData;
}

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
      const { data } = await apiClient.post<DataEnvelope<EventDetail>>(
        '/events',
        toEventFormData(payload),
      );
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
      const { data } = await apiClient.put<DataEnvelope<EventDetail>>(
        `/events/${id}`,
        toEventFormData(payload),
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}
