/**
 * Auth store — role-based session
 * Demo passwords: Admin@123 | Manager@123 | Sales@123
 * Email decides role; one-click demo also sets role correctly.
 */
import { create } from 'zustand';
import { User, UserRole, LoginCredentials, RegisterPayload } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS, initializeLocalDB } from '../services/local/db';
import { mockUsers } from '../data/mock';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials | string, password?: string) => Promise<boolean>;
  loginAsDemo: (role: UserRole) => void;
  register: (payload: RegisterPayload) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  canAccess: (feature: string) => boolean;
}

initializeLocalDB();

// Do NOT auto-login as admin — only restore a real saved session
const savedUser = (() => {
  try {
    const raw = storage.getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (raw && raw.id && raw.role && ['admin', 'manager', 'sales'].includes(raw.role)) {
      return raw;
    }
  } catch { /* ignore */ }
  return null;
})();

const DEMO_PASSWORDS: Record<string, string> = {
  'admin@nexora.demo': 'Admin@123',
  'manager@nexora.demo': 'Manager@123',
  'sales@nexora.demo': 'Sales@123',
  'devon.miller@nexora.demo': 'Sales@123',
  'sophia.rodriguez@nexora.demo': 'Sales@123',
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: savedUser,
  isAuthenticated: !!savedUser,
  isLoading: false,
  error: null,

  login: async (credsOrEmail: any, passwordArg?: string) => {
    const email = (typeof credsOrEmail === 'string' ? credsOrEmail : credsOrEmail?.email || '')
      .toString()
      .trim()
      .toLowerCase();
    const password =
      typeof credsOrEmail === 'string'
        ? passwordArg || ''
        : credsOrEmail?.password || passwordArg || '';

    if (!email) {
      set({ error: 'Email is required', isLoading: false });
      return false;
    }

    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 80));

    // Seed users into storage if missing
    let allUsers = storage.getItem<User[]>(STORAGE_KEYS.USERS, mockUsers);
    if (!allUsers?.length) {
      allUsers = mockUsers;
      storage.setItem(STORAGE_KEYS.USERS, allUsers);
    }

    const matchedUser = allUsers.find((u) => u.email?.toLowerCase() === email);

    if (!matchedUser) {
      set({
        isLoading: false,
        error: 'No account found. Use admin@nexora.demo, manager@nexora.demo, or sales@nexora.demo',
      });
      return false;
    }

    // Password check for demo accounts (accept standard demo passwords & test passwords)
    const expected = DEMO_PASSWORDS[email];
    const normalizedPass = (password || '').toLowerCase();
    const isAcceptedPass =
      !password ||
      normalizedPass === 'demo1234' ||
      normalizedPass === 'demo123' ||
      normalizedPass === 'nexora2026!' ||
      normalizedPass === 'admin@123' ||
      normalizedPass === 'manager@123' ||
      normalizedPass === 'sales@123' ||
      (expected && normalizedPass === expected.toLowerCase()) ||
      (expected && password === expected);

    if (!isAcceptedPass) {
      set({ isLoading: false, error: `Wrong password. Hint: ${expected || 'Admin@123'}` });
      return false;
    }

    // Persist exact role from user record
    storage.setItem(STORAGE_KEYS.CURRENT_USER, matchedUser);
    localStorage.setItem('nexora_token', `tok_${matchedUser.role}_${matchedUser.id}`);

    set({
      user: { ...matchedUser },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
    return true;
  },

  loginAsDemo: (role: UserRole) => {
    const allUsers = storage.getItem<User[]>(STORAGE_KEYS.USERS, mockUsers);
    const demoUser =
      allUsers.find((u) => u.role === role) ||
      mockUsers.find((u) => u.role === role) ||
      mockUsers[0];

    storage.setItem(STORAGE_KEYS.CURRENT_USER, demoUser);
    localStorage.setItem('nexora_token', `tok_${demoUser.role}_${demoUser.id}`);

    set({
      user: { ...demoUser },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  register: async (payload: RegisterPayload) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 300));

    const allUsers = storage.getItem<User[]>(STORAGE_KEYS.USERS, mockUsers);
    if (allUsers.find((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      set({ isLoading: false, error: 'Account already exists.' });
      return false;
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: payload.fullName,
      email: payload.email.toLowerCase(),
      role: 'sales',
      avatar: '',
      title: payload.jobTitle || 'Account Executive',
      department: 'Sales',
      phone: '+1 (555) 019-8822',
      company: payload.company || 'Nexora Inc.',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      status: 'active',
    };

    allUsers.push(newUser);
    storage.setItem(STORAGE_KEYS.USERS, allUsers);
    storage.setItem(STORAGE_KEYS.CURRENT_USER, newUser);
    set({ user: newUser, isAuthenticated: true, isLoading: false, error: null });
    return true;
  },

  forgotPassword: async (email: string) => {
    await new Promise((r) => setTimeout(r, 200));
    return {
      success: true,
      message: `Use demo passwords: Admin@123 / Manager@123 / Sales@123 for ${email}`,
    };
  },

  logout: () => {
    storage.removeItem(STORAGE_KEYS.CURRENT_USER);
    try {
      localStorage.removeItem('nexora_token');
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch { /* ignore */ }
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateProfile: (updates: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) return;
    // Role cannot be changed from profile for security
    const { role: _r, ...safe } = updates as any;
    const updatedUser = { ...currentUser, ...safe };
    const allUsers = storage.getItem<User[]>(STORAGE_KEYS.USERS, mockUsers);
    storage.setItem(
      STORAGE_KEYS.USERS,
      allUsers.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );
    storage.setItem(STORAGE_KEYS.CURRENT_USER, updatedUser);
    set({ user: updatedUser });
  },

  hasRole: (roles: UserRole | UserRole[]) => {
    const currentUser = get().user;
    if (!currentUser) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(currentUser.role);
  },

  canAccess: (feature: string) => {
    const role = get().user?.role;
    if (!role) return false;
    if (role === 'admin') return true;
    const managerFeatures = [
      'dashboard', 'leads', 'customers', 'deals', 'activities', 'tasks',
      'reports', 'analytics', 'notifications', 'team',
    ];
    const salesFeatures = [
      'dashboard', 'leads', 'customers', 'deals', 'activities', 'tasks', 'notifications',
    ];
    if (role === 'manager') return managerFeatures.includes(feature);
    if (role === 'sales') return salesFeatures.includes(feature);
    return false;
  },
}));
