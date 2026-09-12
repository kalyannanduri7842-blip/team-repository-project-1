import { Request, Response } from 'express';
import { taskService } from '../services/task.service';
import { sendSuccess } from '../utils/response';

export class TaskController {
  createTask = async (req: Request, res: Response): Promise<void> => {
    const currentUserId = req.user!.id;
    const task = await taskService.createTask(req.body, currentUserId);
    sendSuccess(res, task, 201);
  };

  getTasks = async (req: Request, res: Response): Promise<void> => {
    const {
      page,
      limit,
      search,
      priority,
      status,
      assignedToId,
      leadId,
      customerId,
      dealId,
      dueBefore,
      dueAfter,
      sortBy,
      sortOrder,
    } = req.query as any;

    const result = await taskService.getTasks({
      page,
      limit,
      search,
      priority,
      status,
      assignedToId,
      leadId,
      customerId,
      dealId,
      dueBefore,
      dueAfter,
      sortBy,
      sortOrder,
    });
    sendSuccess(res, result.tasks, 200, result.meta);
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    const task = await taskService.getTaskById(req.params.id);
    sendSuccess(res, task, 200);
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    const task = await taskService.updateTask(req.params.id, req.body);
    sendSuccess(res, task, 200);
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    const result = await taskService.deleteTask(req.params.id);
    sendSuccess(res, result, 200);
  };
}

export const taskController = new TaskController();
