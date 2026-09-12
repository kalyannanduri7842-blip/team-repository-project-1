import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate, authorizeRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { queryUsersSchema, getUserByIdSchema } from '../validators/user.validator';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(queryUsersSchema), asyncHandler(userController.getUsers));
router.get('/:id', validateRequest(getUserByIdSchema), asyncHandler(userController.getUserById));

export default router;
