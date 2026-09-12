import { Router } from 'express';
import { dealController } from '../controllers/deal.controller';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import {
  createDealSchema,
  updateDealSchema,
  queryDealsSchema,
} from '../validators/deal.validator';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(queryDealsSchema), asyncHandler(dealController.getDeals));
router.post('/', validateRequest(createDealSchema), asyncHandler(dealController.createDeal));
router.get('/:id', asyncHandler(dealController.getDealById));
router.put('/:id', validateRequest(updateDealSchema), asyncHandler(dealController.updateDeal));
router.delete('/:id', asyncHandler(dealController.deleteDeal));

export default router;
