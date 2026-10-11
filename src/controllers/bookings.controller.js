import { BookingsService } from '../services/bookings.service.js';
import { sendError } from '../utils/http-error.js';

const bookingsService = new BookingsService();

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingsService.getBookings();
    res.status(200).json({ status: 'success', payload: bookings });
  } catch (error) {
    sendError(res, error);
  }
};

export const createBooking = async (req, res) => {
  try {
    const booking = await bookingsService.createBooking(req.body);
    res.status(201).json({ status: 'success', payload: booking });
  } catch (error) {
    sendError(res, error);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingsService.getBookingById(bid);
    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    sendError(res, error);
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;
    const booking = await bookingsService.addServiceToBooking(bid, sid, req.body.quantity);
    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    sendError(res, error);
  }
};

export const updateServiceQuantity = async (req, res) => {
  try {
    const { bid, sid } = req.params;
    const booking = await bookingsService.updateServiceQuantity(bid, sid, req.body.quantity);
    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    sendError(res, error);
  }
};

export const removeServiceFromBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;
    const booking = await bookingsService.removeServiceFromBooking(bid, sid);
    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    sendError(res, error);
  }
};

export const clearBookingServices = async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingsService.clearBookingServices(bid);
    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    sendError(res, error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { bid } = req.params;
    await bookingsService.deleteBooking(bid);
    res.status(200).json({ status: 'success', message: 'Reserva eliminada correctamente' });
  } catch (error) {
    sendError(res, error);
  }
};