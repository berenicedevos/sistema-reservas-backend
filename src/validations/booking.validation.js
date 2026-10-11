import { z } from 'zod';
import { objectIdSchema } from './common.validation.js';

const bookingItemSchema = z.object({
  service: objectIdSchema,
  quantity: z.number().int().positive('La cantidad debe ser mayor a cero').default(1)
});

export const createBookingSchema = z.object({
  clientName: z.string().trim().min(1, 'El nombre del cliente es obligatorio'),
  clientEmail: z.string().trim().email('El email no es válido'),
  date: z.string().trim().min(1, 'La fecha es obligatoria'),
  time: z.string().trim().min(1, 'La hora es obligatoria'),
  status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  services: z.array(bookingItemSchema).optional()
});

export const addServiceSchema = z.object({
  quantity: z.number().int().positive('La cantidad debe ser mayor a cero').default(1)
});

export const updateQuantitySchema = z.object({
  quantity: z.number().int().positive('La cantidad debe ser mayor a cero')
});