import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponseEnvelope<T> {
  success: boolean;
  data?: T;
  meta?: PaginationMeta;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  correlationId?: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  meta?: PaginationMeta
): void => {
  const correlationId = res.getHeader('x-correlation-id') as string;
  const envelope: ApiResponseEnvelope<T> = {
    success: true,
    data,
    ...(meta && { meta }),
    ...(correlationId && { correlationId }),
  };
  res.status(statusCode).json(envelope);
};

export const sendError = (
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: any
): void => {
  const correlationId = res.getHeader('x-correlation-id') as string;
  const envelope: ApiResponseEnvelope<null> = {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
    ...(correlationId && { correlationId }),
  };
  res.status(statusCode).json(envelope);
};
