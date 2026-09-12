import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AuthenticationError } from '../errors/AppError';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'SALES_REP';
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as any,
  });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, config.jwtSecret) as TokenPayload;
  } catch (error) {
    throw new AuthenticationError('Invalid or expired authentication token');
  }
};
