import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
  description: z.string().trim().min(1, 'La descripción es obligatoria'),
  duration: z.number().positive('La duración debe ser mayor a cero'),
  price: z.number().min(0, 'El precio no puede ser negativo'),
  category: z.string().trim().min(1, 'La categoría es obligatoria'),
  available: z.boolean().optional()
});

export const updateServiceSchema = createServiceSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

export const serviceQuerySchema = z.object({
  category: z.string().trim().min(1).optional(),
  available: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sort: z.enum(['asc', 'desc']).optional()
});