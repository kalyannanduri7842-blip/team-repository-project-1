import { Request, Response } from 'express';
import { reportService } from '../services/report.service';
import { sendSuccess } from '../utils/response';

export class ReportController {
  getSalesReport = async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, userId } = req.query as any;
    const report = await reportService.getSalesReport({ startDate, endDate, userId });
    sendSuccess(res, report, 200);
  };

  getLeadReport = async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, userId } = req.query as any;
    const report = await reportService.getLeadReport({ startDate, endDate, userId });
    sendSuccess(res, report, 200);
  };

  getPerformanceReport = async (req: Request, res: Response): Promise<void> => {
    const { startDate, endDate, userId } = req.query as any;
    const report = await reportService.getPerformanceReport({ startDate, endDate, userId });
    sendSuccess(res, report, 200);
  };
}

export const reportController = new ReportController();
