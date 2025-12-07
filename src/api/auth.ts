import apiClient from './client';
import type { AuthResponse, LoginRequest, RegisterRequest, ApiResponse } from '@/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/api/auth/refresh', { refreshToken });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/api/auth/logout');
  },

  getProfile: async (): Promise<ApiResponse<{ user: import('@/types').User }>> => {
    const response = await apiClient.get('/api/users/me');
    return response.data;
  },
};

