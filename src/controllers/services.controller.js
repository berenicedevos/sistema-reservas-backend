import { ServicesService } from '../services/services.service.js';
import { sendError } from '../utils/http-error.js';

const servicesService = new ServicesService();

const emitServices = async (req) => {
  const io = req.app.get('io');
  if (!io) return;
  const services = await servicesService.getAllServices();
  io.emit('servicesUpdated', services);
};

export const getServices = async (req, res) => {
  try {
    const result = await servicesService.getServices(req.validatedQuery);
    res.status(200).json({ status: 'success', ...result });
  } catch (error) {
    sendError(res, error);
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await servicesService.getServiceById(sid);
    res.status(200).json({ status: 'success', payload: service });
  } catch (error) {
    sendError(res, error);
  }
};

export const createService = async (req, res) => {
  try {
    const service = await servicesService.createService(req.body);
    await emitServices(req);
    res.status(201).json({ status: 'success', payload: service });
  } catch (error) {
    sendError(res, error);
  }
};

export const updateService = async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await servicesService.updateService(sid, req.body);
    await emitServices(req);
    res.status(200).json({ status: 'success', payload: service });
  } catch (error) {
    sendError(res, error);
  }
};

export const deleteService = async (req, res) => {
  try {
    const { sid } = req.params;
    await servicesService.deleteService(sid);
    await emitServices(req);
    res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente' });
  } catch (error) {
    sendError(res, error);
  }
};