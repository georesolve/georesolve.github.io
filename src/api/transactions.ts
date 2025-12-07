import apiClient from './client';
import type { Transaction, DepositRequest, ApiResponse } from '@/types';

export const transactionsApi = {
  getAll: async (): Promise<ApiResponse<Transaction[]>> => {
    const response = await apiClient.get('/api/transactions');
    return response.data;
  },

  deposit: async (data: DepositRequest): Promise<ApiResponse<Transaction>> => {
    const response = await apiClient.post('/api/transactions/deposit', data);
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Transaction>> => {
    const response = await apiClient.get(`/api/transactions/${id}`);
    return response.data;
  },
};

