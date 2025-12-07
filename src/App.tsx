import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// Dashboard
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardOverview from '@/pages/dashboard/DashboardOverview';
import ApiKeysPage from '@/pages/dashboard/ApiKeysPage';
import StatisticsPage from '@/pages/dashboard/StatisticsPage';
import BillingPage from '@/pages/dashboard/BillingPage';
import SubscriptionPage from '@/pages/dashboard/SubscriptionPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';

// Components
import ScrollToTop from '@/components/common/ScrollToTop';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Guest Route Component (redirect if logged in)
function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Guest Routes */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="transactions" element={<BillingPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<ProfilePage />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}
