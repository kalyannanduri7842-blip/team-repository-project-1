import { Request, Response } from 'express';
import { customerService } from '../services/customer.service';
import { sendSuccess } from '../utils/response';

export class CustomerController {
  createCustomer = async (req: Request, res: Response): Promise<void> => {
    const currentUserId = req.user!.id;
    const customer = await customerService.createCustomer(req.body, currentUserId);
    sendSuccess(res, customer, 201);
  };

  getCustomers = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search, status, ownerId, sortBy, sortOrder } = req.query as any;
    const result = await customerService.getCustomers({
      page,
      limit,
      search,
      status,
      ownerId,
      sortBy,
      sortOrder,
    });
    sendSuccess(res, result.customers, 200, result.meta);
  };

  getCustomerById = async (req: Request, res: Response): Promise<void> => {
    const customer = await customerService.getCustomerById(req.params.id);
    sendSuccess(res, customer, 200);
  };

  updateCustomer = async (req: Request, res: Response): Promise<void> => {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    sendSuccess(res, customer, 200);
  };
}

export const customerController = new CustomerController();
