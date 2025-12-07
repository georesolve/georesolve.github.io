import apiClient from './client';
import type { DashboardStats, UsageStats, ApiResponse } from '@/types';

export const statsApi = {
  getDashboard: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiClient.get('/api/stats/dashboard');
    return response.data;
  },

  getUsageHistory: async (days: number = 30): Promise<ApiResponse<UsageStats[]>> => {
    const response = await apiClient.get(`/api/stats/usage?days=${days}`);
    return response.data;
  },

  getApiKeyStats: async (keyId: number): Promise<ApiResponse<UsageStats[]>> => {
    const response = await apiClient.get(`/api/stats/api-keys/${keyId}`);
    return response.data;
  },
};

