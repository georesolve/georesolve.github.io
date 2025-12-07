import apiClient from './client';
import type { ApiKey, CreateApiKeyRequest, ApiResponse } from '@/types';

export const apiKeysApi = {
  getAll: async (): Promise<ApiResponse<ApiKey[]>> => {
    const response = await apiClient.get('/api/api-keys');
    return response.data;
  },

  create: async (data: CreateApiKeyRequest): Promise<ApiResponse<ApiKey>> => {
    const response = await apiClient.post('/api/api-keys', data);
    return response.data;
  },

  revoke: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/api/api-keys/${id}`);
    return response.data;
  },

  regenerate: async (id: number): Promise<ApiResponse<ApiKey>> => {
    const response = await apiClient.post(`/api/api-keys/${id}/regenerate`);
    return response.data;
  },
};

