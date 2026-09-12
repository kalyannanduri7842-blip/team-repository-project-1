export type UserRole = 'admin' | 'manager' | 'sales';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  department: string;
  phone: string;
  company: string;
  createdAt: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  password?: string;
  confirmPassword?: string;
}
