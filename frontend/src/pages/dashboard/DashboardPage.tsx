/**
 * Role-based dashboard router — MUST show different UI per role
 */
import React from 'react';
import { useAuthStore } from '../../store';
import { AdminDashboard } from './AdminDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { SalesRepDashboard } from './SalesRepDashboard';
import { Navigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Key forces full remount when role changes after login switch
  if (user.role === 'admin') {
    return <AdminDashboard key={`admin-${user.id}`} />;
  }
  if (user.role === 'manager') {
    return <ManagerDashboard key={`manager-${user.id}`} />;
  }
  return <SalesRepDashboard key={`sales-${user.id}`} />;
};

export default DashboardPage;
