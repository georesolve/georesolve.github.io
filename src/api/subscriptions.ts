import apiClient from './client';
import type { SubscriptionPlan, UserSubscription, ApiResponse } from '@/types';

export const subscriptionsApi = {
  getPlans: async (): Promise<ApiResponse<SubscriptionPlan[]>> => {
    const response = await apiClient.get('/api/subscriptions/plans');
    return response.data;
  },

  getCurrentSubscription: async (): Promise<ApiResponse<UserSubscription>> => {
    const response = await apiClient.get('/api/subscriptions/current');
    return response.data;
  },

  subscribe: async (planId: number): Promise<ApiResponse<UserSubscription>> => {
    const response = await apiClient.post(`/api/subscriptions/subscribe/${planId}`);
    return response.data;
  },

  cancel: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/api/subscriptions/cancel');
    return response.data;
  },
};

