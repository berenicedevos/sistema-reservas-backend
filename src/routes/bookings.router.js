import { Router } from 'express';
import {
  getBookings,
  createBooking,
  getBookingById,
  addServiceToBooking,
  updateServiceQuantity,
  removeServiceFromBooking,
  clearBookingServices,
  deleteBooking
} from '../controllers/bookings.controller.js';
import { validateBody, validateObjectId } from '../middlewares/validate.middleware.js';
import {
  createBookingSchema,
  addServiceSchema,
  updateQuantitySchema
} from '../validations/booking.validation.js';

const router = Router();

router.get('/', getBookings);
router.post('/', validateBody(createBookingSchema), createBooking);
router.get('/:bid', validateObjectId('bid'), getBookingById);
router.delete('/:bid', validateObjectId('bid'), deleteBooking);
router.delete('/:bid/services', validateObjectId('bid'), clearBookingServices);
router.post(
  '/:bid/services/:sid',
  validateObjectId('bid', 'sid'),
  validateBody(addServiceSchema),
  addServiceToBooking
);
router.put(
  '/:bid/services/:sid',
  validateObjectId('bid', 'sid'),
  validateBody(updateQuantitySchema),
  updateServiceQuantity
);
router.delete('/:bid/services/:sid', validateObjectId('bid', 'sid'), removeServiceFromBooking);

export default router;