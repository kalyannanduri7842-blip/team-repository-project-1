import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export class AuthController {
  register = async (req: Request, res: Response): Promise<void> => {
    const result = await authService.register(req.body);
    sendSuccess(res, result, 201);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await authService.login(req.body);
    sendSuccess(res, result, 200);
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    const token = req.token!;
    const result = await authService.logout(token);
    sendSuccess(res, result, 200);
  };
}

export const authController = new AuthController();
