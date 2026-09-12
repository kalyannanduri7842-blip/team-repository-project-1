import { Request, Response } from 'express';
import { leadService } from '../services/lead.service';
import { sendSuccess } from '../utils/response';

export class LeadController {
  createLead = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const lead = await leadService.createLead({
      ...req.body,
      createdByUserId: userId,
    });
    sendSuccess(res, lead, 201);
  };

  getLeads = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search, status, source, assignedToId, sortBy, sortOrder } = req.query as any;
    const result = await leadService.getLeads({
      page,
      limit,
      search,
      status,
      source,
      assignedToId,
      sortBy,
      sortOrder,
    });
    sendSuccess(res, result.leads, 200, result.meta);
  };

  getLeadById = async (req: Request, res: Response): Promise<void> => {
    const lead = await leadService.getLeadById(req.params.id);
    sendSuccess(res, lead, 200);
  };

  updateLead = async (req: Request, res: Response): Promise<void> => {
    const lead = await leadService.updateLead(req.params.id, req.body);
    sendSuccess(res, lead, 200);
  };

  deleteLead = async (req: Request, res: Response): Promise<void> => {
    const result = await leadService.deleteLead(req.params.id);
    sendSuccess(res, result, 200);
  };

  convertLead = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const result = await leadService.convertLead(req.params.id, {
      ...req.body,
      userId,
    });
    sendSuccess(res, result, 200);
  };
}

export const leadController = new LeadController();
