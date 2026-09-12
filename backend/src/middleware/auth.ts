import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { AuthenticationError, AuthorizationError } from '../errors/AppError';
import prisma from '../database/client';
import crypto from 'crypto';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: 'ADMIN' | 'MANAGER' | 'SALES_REP';
        firstName: string;
        lastName: string;
      };
      token?: string;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AuthenticationError('Authentication token required'));
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token expiration & signature
    const decoded = verifyToken(token);

    // Check token blacklist (if token was logged out)
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const blacklisted = await prisma.tokenBlacklist.findUnique({
      where: { tokenHash },
    });

    if (blacklisted) {
      return next(new AuthenticationError('Token has been invalidated (logged out)'));
    }

    // Verify user exists and is active in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      return next(new AuthenticationError('User account is inactive or no longer exists'));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRole = (...allowedRoles: Array<'ADMIN' | 'MANAGER' | 'SALES_REP'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError('User not authenticated'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AuthorizationError(`Role '${req.user.role}' is not authorized to access this resource`));
    }

    next();
  };
};
