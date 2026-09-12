import { Router } from 'express';
import { customerController } from '../controllers/customer.controller';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import {
  createCustomerSchema,
  updateCustomerSchema,
  queryCustomersSchema,
} from '../validators/customer.validator';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(queryCustomersSchema), asyncHandler(customerController.getCustomers));
router.post('/', validateRequest(createCustomerSchema), asyncHandler(customerController.createCustomer));
router.get('/:id', asyncHandler(customerController.getCustomerById));
router.put('/:id', validateRequest(updateCustomerSchema), asyncHandler(customerController.updateCustomer));

export default router;
