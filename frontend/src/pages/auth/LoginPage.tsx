import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo, isLoading, error } = useAuthStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const [email, setEmail] = useState('admin@nexora.demo');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await login({ email, password, rememberMe });
    if (success) {
      showSuccess(`Welcome back to NEXORA CRM!`);
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemo(role);
    showSuccess(`Signed in with ${role.toUpperCase()} demo role`);
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#fffbf8] dark:bg-[#0b261c] border border-[#fed7aa] dark:border-[#164e37] rounded-3xl p-8 shadow-2xl">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-peach-50 tracking-tight">
          Sign in to your account
        </h1>
        <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-1">
          Each role has its own dashboard. Admin = full org · Manager = team · Sales = personal only.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Demo Account Quick Switcher */}
      <div className="mb-6 p-3.5 rounded-2xl bg-[#ffeedd]/90 dark:bg-[#062016] border border-[#fed7aa] dark:border-[#164e37]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-forest-900 dark:text-peach-300 flex items-center gap-1.5 font-mono">
            <UserCheck className="w-3.5 h-3.5" />
            One-Click Demo Roles
          </span>
          <span className="text-[10px] text-forest-700 dark:text-peach-400 font-medium font-mono">Offline Local</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="p-2 rounded-xl bg-[#fff8f3] dark:bg-[#0b261c] text-slate-800 dark:text-peach-100 hover:border-peach-500 border border-[#fed7aa] dark:border-[#164e37] text-xs font-semibold shadow-xs hover:text-forest-900 dark:hover:text-peach-300 transition-all text-center"
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('manager')}
            className="p-2 rounded-xl bg-[#fff8f3] dark:bg-[#0b261c] text-slate-800 dark:text-peach-100 hover:border-peach-500 border border-[#fed7aa] dark:border-[#164e37] text-xs font-semibold shadow-xs hover:text-forest-900 dark:hover:text-peach-300 transition-all text-center"
          >
            Manager
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('sales')}
            className="p-2 rounded-xl bg-[#fff8f3] dark:bg-[#0b261c] text-slate-800 dark:text-peach-100 hover:border-peach-500 border border-[#fed7aa] dark:border-[#164e37] text-xs font-semibold shadow-xs hover:text-forest-900 dark:hover:text-peach-300 transition-all text-center"
          >
            Sales Rep
          </button>
        </div>
      </div>

      <div className="relative flex py-2 items-center mb-5">
        <div className="flex-grow border-t border-[#fed7aa] dark:border-[#164e37]" />
        <span className="flex-shrink mx-4 text-[11px] font-medium text-slate-400 dark:text-peach-200/60 uppercase font-mono">
          Or with email
        </span>
        <div className="flex-grow border-t border-[#fed7aa] dark:border-[#164e37]" />
      </div>

      
      <div className="mb-5 p-3 rounded-xl bg-white/80 dark:bg-[#041710] border border-[#fed7aa] dark:border-[#164e37] text-[11px]">
        <p className="font-bold text-forest-900 dark:text-peach-200 mb-2">Demo login credentials</p>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500">
              <th className="py-1 pr-2">Role</th>
              <th className="py-1 pr-2">Email</th>
              <th className="py-1">Password</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-peach-100">
            <tr><td className="py-0.5 pr-2 font-semibold">Admin</td><td className="pr-2">admin@nexora.demo</td><td>Admin@123</td></tr>
            <tr><td className="py-0.5 pr-2 font-semibold">Manager</td><td className="pr-2">manager@nexora.demo</td><td>Manager@123</td></tr>
            <tr><td className="py-0.5 pr-2 font-semibold">Sales</td><td className="pr-2">sales@nexora.demo</td><td>Sales@123</td></tr>
          </tbody>
        </table>
        <p className="mt-2 text-slate-500">Each role opens a different dashboard with different menu limits.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          leftIcon={<Mail className="w-4 h-4 text-forest-800 dark:text-peach-400" />}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-forest-800 dark:text-peach-400" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-peach-200/80">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[#fed7aa] dark:border-[#164e37] text-forest-800 focus:ring-peach-500 w-3.5 h-3.5"
            />
            <span>Remember for 30 days</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-forest-800 hover:text-forest-950 dark:text-peach-400"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2 bg-forest-900 hover:bg-forest-850 text-peach-100 border border-peach-400/30"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500 dark:text-peach-200/70">
        Don't have an account yet?{' '}
        <Link
          to="/register"
          className="font-semibold text-forest-800 hover:text-forest-950 dark:text-peach-400"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};
