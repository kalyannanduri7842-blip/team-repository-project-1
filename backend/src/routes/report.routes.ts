import { Router } from 'express';
import { reportController } from '../controllers/report.controller';
import { authenticate, authorizeRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { reportQuerySchema } from '../validators/report.validator';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(authenticate);
router.use(authorizeRole('ADMIN', 'MANAGER'));

router.get('/sales', validateRequest(reportQuerySchema), asyncHandler(reportController.getSalesReport));
router.get('/leads', validateRequest(reportQuerySchema), asyncHandler(reportController.getLeadReport));
router.get('/performance', validateRequest(reportQuerySchema), asyncHandler(reportController.getPerformanceReport));

export default router;
