import { Router } from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/services.controller.js';
import {
  validateBody,
  validateQuery,
  validateObjectId
} from '../middlewares/validate.middleware.js';
import {
  createServiceSchema,
  updateServiceSchema,
  serviceQuerySchema
} from '../validations/service.validation.js';

const router = Router();

router.get('/', validateQuery(serviceQuerySchema), getServices);
router.get('/:sid', validateObjectId('sid'), getServiceById);
router.post('/', validateBody(createServiceSchema), createService);
router.put('/:sid', validateObjectId('sid'), validateBody(updateServiceSchema), updateService);
router.delete('/:sid', validateObjectId('sid'), deleteService);

export default router;