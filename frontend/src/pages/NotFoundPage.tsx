import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 text-brand-600 shadow-sm border border-brand-100">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>
      <h1 className="text-6xl font-black text-slate-900 tracking-tight mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-8 text-sm leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable in NEXORA CRM.
      </p>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => window.history.back()} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Go Back
        </Button>
        <Link to="/dashboard">
          <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
