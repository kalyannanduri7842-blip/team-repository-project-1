import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { sendError } from '../utils/response';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const correlationId = req.correlationId;

  if (err instanceof ZodError) {
    const formattedDetails = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    logger.warn(`Validation Error: ${err.message}`, { correlationId });
    sendError(res, 400, 'VALIDATION_ERROR', 'Request validation failed', formattedDetails);
    return;
  }

  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error(`AppError: ${err.message}`, { correlationId, stack: err.stack });
    } else {
      logger.warn(`AppError (${err.code}): ${err.message}`, { correlationId });
    }
    sendError(res, err.statusCode, err.code, err.message, err.details);
    return;
  }

  logger.error(`Unhandled Exception: ${err.message}`, { correlationId, stack: err.stack });
  sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'An unexpected error occurred on the server');
};
