import { User, Lead, Customer, Deal, Activity, Task, Role, UserStatus, LeadStatus, LeadSource, CustomerStatus, DealStage, ActivityType, TaskPriority, TaskStatus } from '@prisma/client';
import { hashPassword } from '../src/utils/password';
import { generateToken } from '../src/utils/jwt';

export const setupTestState = async () => {
  const passwordHash = await hashPassword('Password123!');

  const adminUser: User = {
    id: '11111111-1111-4111-8111-111111111111',
    email: 'admin.test@crm.com',
    passwordHash,
    firstName: 'Admin',
    lastName: 'Tester',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const managerUser: User = {
    id: '22222222-2222-4222-8222-222222222222',
    email: 'manager.test@crm.com',
    passwordHash,
    firstName: 'Manager',
    lastName: 'Tester',
    role: 'MANAGER',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const repUser: User = {
    id: '33333333-3333-4333-8333-333333333333',
    email: 'rep.test@crm.com',
    passwordHash,
    firstName: 'Rep',
    lastName: 'Tester',
    role: 'SALES_REP',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const adminToken = generateToken({ userId: adminUser.id, email: adminUser.email, role: adminUser.role });
  const managerToken = generateToken({ userId: managerUser.id, email: managerUser.email, role: managerUser.role });
  const repToken = generateToken({ userId: repUser.id, email: repUser.email, role: repUser.role });

  return {
    adminUser,
    managerUser,
    repUser,
    adminToken,
    managerToken,
    repToken,
  };
};
