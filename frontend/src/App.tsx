import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { ProtectedRoute, PublicOnlyRoute } from './components/layout/ProtectedRoute';
import { ToastContainer } from './components/ui/ToastContainer';
import { initializeLocalDB } from './services/local/db';

// Auth Pages
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/auth';

// Dashboard & Core Pages
import { DashboardPage } from './pages/dashboard';
import { LeadListPage, AddLeadPage, EditLeadPage, LeadDetailsPage } from './pages/leads';
import { CustomerListPage, AddCustomerPage, EditCustomerPage, CustomerDetailsPage } from './pages/customers';
import { DealKanbanPage, DealListPage, AddDealPage, EditDealPage, DealDetailsPage } from './pages/deals';
import { ActivitiesHubPage, CallsPage, MeetingsPage, NotesPage } from './pages/activities';
import { TasksPage } from './pages/tasks';
import { ReportsHubPage, AnalyticsPage } from './pages/reports';
import { NotificationsPage } from './pages/notifications';
import { SettingsPage } from './pages/settings';
import { NotFoundPage } from './pages/NotFoundPage';

const RoleGuard: React.FC<{ roles: Array<'admin' | 'manager' | 'sales'>; children: React.ReactNode }> = ({
  roles,
  children,
}) => {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role as any)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  useEffect(() => {
    // Initialize LocalStorage database with enterprise seeds on cold boot
    initializeLocalDB();
  }, []);

  return (
    <>
      <Routes>
        {/* Public / Authentication Routes */}
        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Route>

        {/* Protected Application Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Leads Routes */}
            <Route path="/leads" element={<LeadListPage />} />
            <Route path="/leads/new" element={<AddLeadPage />} />
            <Route path="/leads/:id" element={<LeadDetailsPage />} />
            <Route path="/leads/:id/edit" element={<EditLeadPage />} />

            {/* Customers Routes */}
            <Route path="/customers" element={<CustomerListPage />} />
            <Route path="/customers/new" element={<AddCustomerPage />} />
            <Route path="/customers/:id" element={<CustomerDetailsPage />} />
            <Route path="/customers/:id/edit" element={<EditCustomerPage />} />

            {/* Deals / Pipeline Routes */}
            <Route path="/deals" element={<DealKanbanPage />} />
            <Route path="/deals/kanban" element={<DealKanbanPage />} />
            <Route path="/deals/list" element={<DealListPage />} />
            <Route path="/deals/new" element={<AddDealPage />} />
            <Route path="/deals/:id" element={<DealDetailsPage />} />
            <Route path="/deals/:id/edit" element={<EditDealPage />} />

            {/* Activities Routes */}
            <Route path="/activities" element={<ActivitiesHubPage />} />
            <Route path="/activities/calls" element={<CallsPage />} />
            <Route path="/activities/meetings" element={<MeetingsPage />} />
            <Route path="/activities/notes" element={<NotesPage />} />

            {/* Tasks Routes */}
            <Route path="/tasks" element={<TasksPage />} />

            {/* Reports & Analytics Routes */}
            <Route path="/reports" element={<RoleGuard roles={["admin","manager"]}><ReportsHubPage /></RoleGuard>} />
            <Route path="/analytics" element={<RoleGuard roles={["admin","manager"]}><AnalyticsPage /></RoleGuard>} />

            {/* Notifications & Settings */}
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Toast System */}
      <ToastContainer />
    </>
  );
};

export default App;
