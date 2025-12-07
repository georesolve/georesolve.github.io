// User & Auth Types
export interface User {
    id: number;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
    balance: number;
    createdAt: string;
    subscription?: UserSubscription;
}

export interface UserSubscription {
    id: number;
    plan: SubscriptionPlan;
    startDate: string;
    endDate: string;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}

export interface SubscriptionPlan {
    id: number;
    name: string;
    code: string;
    description: string;
    monthlyPrice: number;
    requestsPerMinute: number;
    requestsPerDay: number;
    maxApiKeys: number;
    features: string[];
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: User;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

// API Key Types
export interface ApiKey {
    id: number;
    name: string;
    keyPrefix: string;
    key?: string; // Only returned on creation
    createdAt: string;
    lastUsedAt?: string;
    expiresAt?: string;
    status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
    requestsToday: number;
    requestsThisMonth: number;
}

export interface CreateApiKeyRequest {
    name: string;
    expiresInDays?: number;
}

// Transaction Types
export interface Transaction {
    id: number;
    type: 'DEPOSIT' | 'SUBSCRIPTION' | 'REFUND';
    amount: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    description: string;
    createdAt: string;
    paymentMethod?: string;
}

export interface DepositRequest {
    amount: number;
    paymentMethod: string;
}

// Usage Statistics
export interface UsageStats {
    date: string;
    requests: number;
    searchRequests: number;
    reverseRequests: number;
    lookupRequests: number;
}

export interface DashboardStats {
    totalRequests: number;
    requestsToday: number;
    requestsThisMonth: number;
    activeApiKeys: number;
    currentBalance: number;
    planName: string;
    planExpiresAt?: string;
    usageHistory: UsageStats[];
}

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

