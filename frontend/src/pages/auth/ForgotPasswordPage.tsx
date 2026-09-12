import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [demoMessage, setDemoMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const res = await forgotPassword(email);
    setDemoMessage(res.message);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
      {!isSubmitted ? (
        <>
          <div className="mb-6 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Reset your password
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter your registered email address and we'll simulate sending you a password reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Send Reset Instructions
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center py-4 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Check your email
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
            {demoMessage}
          </p>

          <div className="p-3 bg-peach-100 dark:bg-forest-900/40 border border-peach-200 dark:border-forest-900/50 rounded-2xl text-[11px] text-forest-900 dark:text-peach-300 text-left">
            💡 <strong>Demo Mode Note:</strong> This is a frontend-only application running fully inside your browser. No actual emails are sent. You can log in using any demo account credentials.
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-forest-700 dark:text-peach-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
};
