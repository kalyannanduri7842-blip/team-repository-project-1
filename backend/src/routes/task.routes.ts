import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema, queryTasksSchema } from '../validators/task.validator';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(queryTasksSchema), asyncHandler(taskController.getTasks));
router.post('/', validateRequest(createTaskSchema), asyncHandler(taskController.createTask));
router.get('/:id', asyncHandler(taskController.getTaskById));
router.put('/:id', validateRequest(updateTaskSchema), asyncHandler(taskController.updateTask));
router.delete('/:id', asyncHandler(taskController.deleteTask));

export default router;
