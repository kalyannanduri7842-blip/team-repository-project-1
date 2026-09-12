import { Request, Response } from 'express';
import { dealService } from '../services/deal.service';
import { sendSuccess } from '../utils/response';

export class DealController {
  createDeal = async (req: Request, res: Response): Promise<void> => {
    const currentUserId = req.user!.id;
    const deal = await dealService.createDeal(req.body, currentUserId);
    sendSuccess(res, deal, 201);
  };

  getDeals = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search, stage, ownerId, customerId, minAmount, maxAmount, sortBy, sortOrder } = req.query as any;
    const result = await dealService.getDeals({
      page,
      limit,
      search,
      stage,
      ownerId,
      customerId,
      minAmount,
      maxAmount,
      sortBy,
      sortOrder,
    });
    sendSuccess(res, result.deals, 200, result.meta);
  };

  getDealById = async (req: Request, res: Response): Promise<void> => {
    const deal = await dealService.getDealById(req.params.id);
    sendSuccess(res, deal, 200);
  };

  updateDeal = async (req: Request, res: Response): Promise<void> => {
    const deal = await dealService.updateDeal(req.params.id, req.body);
    sendSuccess(res, deal, 200);
  };

  deleteDeal = async (req: Request, res: Response): Promise<void> => {
    const result = await dealService.deleteDeal(req.params.id);
    sendSuccess(res, result, 200);
  };
}

export const dealController = new DealController();
