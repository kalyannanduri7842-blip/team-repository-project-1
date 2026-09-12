import prisma from './client';
import { hashPassword } from '../utils/password';
import { logger } from '../utils/logger';

export const seedDatabase = async () => {
  logger.info('Starting database seed execution...');

  // 1. Seed Users
  const adminPassword = await hashPassword('Password123!');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@crm.com' },
    update: {},
    create: {
      email: 'admin@crm.com',
      passwordHash: adminPassword,
      firstName: 'System',
      lastName: 'Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@crm.com' },
    update: {},
    create: {
      email: 'manager@crm.com',
      passwordHash: adminPassword,
      firstName: 'Sarah',
      lastName: 'Manager',
      role: 'MANAGER',
      status: 'ACTIVE',
    },
  });

  const salesRep = await prisma.user.upsert({
    where: { email: 'rep@crm.com' },
    update: {},
    create: {
      email: 'rep@crm.com',
      passwordHash: adminPassword,
      firstName: 'John',
      lastName: 'Rep',
      role: 'SALES_REP',
      status: 'ACTIVE',
    },
  });

  logger.info(`Users seeded: Admin (${admin.email}), Manager (${manager.email}), Rep (${salesRep.email})`);

  // 2. Seed Leads
  const lead1 = await prisma.lead.create({
    data: {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@acme.com',
      phone: '+1-555-0101',
      company: 'Acme Corp',
      title: 'VP of Technology',
      source: 'WEBSITE',
      status: 'QUALIFIED',
      value: 45000,
      assignedToId: salesRep.id,
      createdByUserId: admin.id,
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob.jones@starlight.io',
      phone: '+1-555-0102',
      company: 'Starlight Tech',
      title: 'CEO',
      source: 'REFERRAL',
      status: 'NEW',
      value: 85000,
      assignedToId: salesRep.id,
      createdByUserId: manager.id,
    },
  });

  logger.info(`Leads seeded: ${lead1.email}, ${lead2.email}`);

  // 3. Seed Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Global Enterprises Inc',
      contactEmail: 'contact@globalent.com',
      contactPhone: '+1-555-0199',
      industry: 'Enterprise Software',
      address: '100 Innovation Way, Suite 400',
      status: 'ACTIVE',
      ownerId: salesRep.id,
    },
  });

  logger.info(`Customer seeded: ${customer1.name}`);

  // 4. Seed Deals
  const deal1 = await prisma.deal.create({
    data: {
      title: 'Global Ent - 500 Enterprise Licenses',
      amount: 125000,
      stage: 'PROPOSAL',
      probability: 50,
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      customerId: customer1.id,
      ownerId: salesRep.id,
    },
  });

  const deal2 = await prisma.deal.create({
    data: {
      title: 'Global Ent - Implementation Services',
      amount: 35000,
      stage: 'CLOSED_WON',
      probability: 100,
      closedAt: new Date(),
      customerId: customer1.id,
      ownerId: salesRep.id,
    },
  });

  logger.info(`Deals seeded: ${deal1.title}, ${deal2.title}`);

  // 5. Seed Activities
  await prisma.activity.create({
    data: {
      type: 'CALL',
      subject: 'Discovery Call with VP Tech',
      description: 'Discussed cloud migration timeline and security constraints.',
      userId: salesRep.id,
      leadId: lead1.id,
    },
  });

  await prisma.activity.create({
    data: {
      type: 'MEETING',
      subject: 'Proposal Presentation',
      description: 'Presented initial SOW and pricing tiers.',
      userId: salesRep.id,
      customerId: customer1.id,
      dealId: deal1.id,
    },
  });

  // 6. Seed Tasks
  await prisma.task.create({
    data: {
      title: 'Send Revised Contract Draft',
      description: 'Update Section 4 with custom SLA agreement.',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: 'HIGH',
      status: 'PENDING',
      assignedToId: salesRep.id,
      createdByUserId: manager.id,
      dealId: deal1.id,
    },
  });

  logger.info('Database seeding completed successfully!');
};

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      logger.error(`Seed failure: ${err.message}`);
      process.exit(1);
    });
}
