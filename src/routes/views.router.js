import { Router } from 'express';
import {
  renderServices,
  renderRealtimeServices,
  renderBookingDetail
} from '../controllers/views.controller.js';
import { validateObjectId } from '../middlewares/validate.middleware.js';

const router = Router();

router.get('/', (req, res) => res.redirect('/services'));
router.get('/services', renderServices);
router.get('/realtime-services', renderRealtimeServices);
router.get('/bookings/:bid', validateObjectId('bid'), renderBookingDetail);

export default router;