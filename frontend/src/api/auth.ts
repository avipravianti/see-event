import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, getToken, setToken } from '@/lib/apiClient';
import type {
  AuthResponse,
  DataEnvelope,
  SignInPayload,
  SignUpPayload,
  UserDetail,
} from '@/types';

export function useSignIn() {
  return useMutation({
    mutationFn: async (payload: SignInPayload): Promise<AuthResponse> => {
      const { data } = await apiClient.post<AuthResponse>('/users/signin', payload);
      return data;
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem('isAuthenticated', 'true');
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (payload: SignUpPayload): Promise<void> => {
      await apiClient.post('/users/signup', payload);
    },
  });
}

export function useAccount() {
  return useQuery({
    queryKey: ['account'],
    enabled: Boolean(getToken()),
    queryFn: async (): Promise<UserDetail> => {
      const { data } = await apiClient.get<DataEnvelope<UserDetail>>('/users');
      return data.data;
    },
  });
}
