import { ServicesService } from '../services/services.service.js';
import { BookingsService } from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

const renderServerError = (res) =>
  res.status(500).render('not-found', {
    title: 'Error',
    message: 'Ocurrió un error en el servidor'
  });

export const renderServices = async (req, res) => {
  try {
    const services = await servicesService.getAllServices();
    res.render('services', { title: 'Servicios disponibles', services });
  } catch (error) {
    console.error(error);
    renderServerError(res);
  }
};

export const renderRealtimeServices = async (req, res) => {
  try {
    const services = await servicesService.getAllServices();
    res.render('realtime-services', { title: 'Servicios en tiempo real', services });
  } catch (error) {
    console.error(error);
    renderServerError(res);
  }
};

export const renderBookingDetail = async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingsService.getBookingById(bid);
    res.render('booking-detail', { title: 'Detalle de reserva', booking });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).render('not-found', {
        title: 'Reserva no encontrada',
        message: 'No existe una reserva con ese ID'
      });
    }
    console.error(error);
    renderServerError(res);
  }
};