import { Request, Response } from 'express';
import { activityService } from '../services/activity.service';
import { sendSuccess } from '../utils/response';

export class ActivityController {
  createActivity = async (req: Request, res: Response): Promise<void> => {
    const currentUserId = req.user!.id;
    const activity = await activityService.createActivity(req.body, currentUserId);
    sendSuccess(res, activity, 201);
  };

  getActivities = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, type, userId, leadId, customerId, dealId, startDate, endDate } = req.query as any;
    const result = await activityService.getActivities({
      page,
      limit,
      type,
      userId,
      leadId,
      customerId,
      dealId,
      startDate,
      endDate,
    });
    sendSuccess(res, result.activities, 200, result.meta);
  };

  deleteActivity = async (req: Request, res: Response): Promise<void> => {
    const result = await activityService.deleteActivity(req.params.id);
    sendSuccess(res, result, 200);
  };
}

export const activityController = new ActivityController();
