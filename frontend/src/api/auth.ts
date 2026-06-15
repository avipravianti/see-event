import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, getToken, setToken } from '@/lib/apiClient';
import { queryClient } from '@/lib/queryClient';
import type {
  AuthResponse,
  DataEnvelope,
  PasswordInput,
  ProfileInput,
  SignInPayload,
  SignUpPayload,
  UserDetail,
} from '@/types';

const accountKey = ['account'] as const;

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
    queryKey: accountKey,
    enabled: Boolean(getToken()),
    queryFn: async (): Promise<UserDetail> => {
      const { data } = await apiClient.get<DataEnvelope<UserDetail>>('/users');
      return data.data;
    },
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (payload: ProfileInput): Promise<UserDetail> => {
      const { data } = await apiClient.put<DataEnvelope<UserDetail>>('/users', payload);
      return data.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(accountKey, user);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: PasswordInput): Promise<void> => {
      await apiClient.put('/users/password', payload);
    },
  });
}
