import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, Zap, BarChart2, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../components/brand/BrandLogo';
import { AmbientBackground } from '../components/ui/AmbientBackground';
import { ToastContainer } from '../components/ui/ToastContainer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#062016] text-[#fff8f3] font-sans selection:bg-peach-600 selection:text-white relative overflow-hidden">
      {/* 3D Interactive Ambient Living Background */}
      <AmbientBackground />

      {/* Left Promotional / Value Proposition Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-[#020e09]/80 via-[#0b261c]/85 to-[#062016]/90 border-r border-[#0e3526] relative z-10 backdrop-blur-xs">
        {/* Brand Main Attraction */}
        <div className="z-10">
          <BrandLogo size="lg" />
        </div>

        {/* Testimonial / Value prop */}
        <div className="max-w-md z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-peach-500/15 border border-peach-500/30 text-xs font-semibold text-peach-300">
            <Zap className="w-3.5 h-3.5" />
            <span>Next-Generation Sales Automation</span>
          </div>

          <h2 className="text-3xl font-extrabold text-peach-50 leading-tight tracking-tight">
            Accelerate your revenue engine with intelligent pipeline management.
          </h2>

          <p className="text-peach-200/80 text-sm leading-relaxed">
            NEXORA delivers high-velocity lead tracking, 360-degree customer insights, Kanban pipeline forecasting, and team performance metrics in a blazing fast frontend experience.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Enterprise-grade Customer 360 & Health Analytics',
              'Real-time drag & drop Kanban pipeline with win probability',
              'Integrated call logs, calendar meetings, and smart notes',
              'Full offline capability with instant LocalStorage sync',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-peach-100">
                <CheckCircle2 className="w-4 h-4 text-peach-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-peach-300/60 z-10 border-t border-[#0e3526] pt-6 font-mono">
          <span>© 2026 NEXORA CRM Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-peach-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-peach-200 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Right Form Card Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#041710]/80 relative z-10 backdrop-blur-xs">
        <div className="w-full max-w-md">
          {/* Mobile brand visible only on small screens */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <BrandLogo size="md" />
          </div>

          <Outlet />
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
