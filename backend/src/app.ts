import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/env';
import { logger } from './utils/logger';
import { correlationMiddleware } from './middleware/correlation';
import { errorHandler } from './middleware/errorHandler';
import { sendSuccess } from './utils/response';
import { NotFoundError } from './errors/AppError';
import { swaggerSpec } from './swagger';

// Route Imports
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import leadRoutes from './routes/lead.routes';
import customerRoutes from './routes/customer.routes';
import dealRoutes from './routes/deal.routes';
import activityRoutes from './routes/activity.routes';
import taskRoutes from './routes/task.routes';
import reportRoutes from './routes/report.routes';

const app = express();

// Security & Base Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(correlationMiddleware);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again later after 15 minutes',
    },
  },
});
app.use('/api', limiter);

// OpenAPI Swagger UI Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  sendSuccess(res, {
    status: 'UP',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API Routes Definition
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);

// 404 Route Handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route '${req.originalUrl}' with method '${req.method}' does not exist`));
});

// Centralized Global Error Handler
app.use(errorHandler);

// Server Listener Initialization
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    logger.info(`=======================================================`);
    logger.info(`  CRM Backend API running on port: ${config.port}`);
    logger.info(`  Environment: ${config.nodeEnv}`);
    logger.info(`  Swagger Documentation: http://localhost:${config.port}/api-docs`);
    logger.info(`=======================================================`);
  });
}

export default app;
