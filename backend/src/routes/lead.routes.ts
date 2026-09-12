import { Router } from 'express';
import { leadController } from '../controllers/lead.controller';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import {
  createLeadSchema,
  updateLeadSchema,
  queryLeadsSchema,
  convertLeadSchema,
} from '../validators/lead.validator';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(queryLeadsSchema), asyncHandler(leadController.getLeads));
router.post('/', validateRequest(createLeadSchema), asyncHandler(leadController.createLead));
router.get('/:id', asyncHandler(leadController.getLeadById));
router.put('/:id', validateRequest(updateLeadSchema), asyncHandler(leadController.updateLead));
router.delete('/:id', asyncHandler(leadController.deleteLead));
router.post('/:id/convert', validateRequest(convertLeadSchema), asyncHandler(leadController.convertLead));

export default router;
