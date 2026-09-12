import { Router } from 'express';
import { activityController } from '../controllers/activity.controller';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { createActivitySchema, queryActivitiesSchema } from '../validators/activity.validator';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(queryActivitiesSchema), asyncHandler(activityController.getActivities));
router.post('/', validateRequest(createActivitySchema), asyncHandler(activityController.createActivity));
router.delete('/:id', asyncHandler(activityController.deleteActivity));

export default router;
