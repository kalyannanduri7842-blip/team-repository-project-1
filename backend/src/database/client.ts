import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'test') {
  // Prisma instance for test environment
  prisma = new PrismaClient({
    log: ['error'],
  });
} else {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
}

export const connectDb = async () => {
  try {
    await prisma.$connect();
    logger.info('Successfully connected to PostgreSQL database via Prisma ORM');
  } catch (error: any) {
    logger.error(`Database connection failed: ${error.message}`);
  }
};

export const disconnectDb = async () => {
  await prisma.$disconnect();
};

export default prisma;
