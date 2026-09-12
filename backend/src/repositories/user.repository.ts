import prisma from '../database/client';
import { User, Role, UserStatus, Prisma } from '@prisma/client';

export interface FindUsersParams {
  page: number;
  limit: number;
  search?: string;
  role?: Role;
  status?: UserStatus;
}

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async create(data: {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: Role;
    status?: UserStatus;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
      },
    });
  }

  async findMany(params: FindUsersParams): Promise<{ users: User[]; total: number }> {
    const { page, limit, search, role, status } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async blacklistToken(tokenHash: string, expiresAt: Date): Promise<void> {
    await prisma.tokenBlacklist.create({
      data: {
        tokenHash,
        expiresAt,
      },
    });
  }
}

export const userRepository = new UserRepository();
