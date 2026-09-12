import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar, Navbar } from '../components/navigation';
import { AmbientBackground } from '../components/ui/AmbientBackground';
import { ToastContainer } from '../components/ui/ToastContainer';
import { useAuthStore } from '../store';

export const MainLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If user is not logged in, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen bg-transparent overflow-hidden font-sans text-slate-900 dark:text-slate-100 relative">
      {/* 3D Animated Interactive Dynamic Background */}
      <AmbientBackground />

      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} onMobileClose={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 backdrop-blur-[1px]">
        <Navbar onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
