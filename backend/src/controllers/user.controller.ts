import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { sendSuccess } from '../utils/response';

export class UserController {
  getUsers = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search, role, status } = req.query as any;
    const result = await userService.getUsers({
      page,
      limit,
      search,
      role,
      status,
    });
    sendSuccess(res, result.users, 200, result.meta);
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const user = await userService.getUserById(req.params.id);
    sendSuccess(res, user, 200);
  };
}

export const userController = new UserController();
