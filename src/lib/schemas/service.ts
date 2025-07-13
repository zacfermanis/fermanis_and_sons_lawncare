import { z } from 'zod'

export const ServiceSchema = z.object({
  id: z.string().min(1, 'Service ID is required'),
  name: z.string().min(1, 'Service name is required'),
  description: z.string().min(1, 'Service description is required'),
  price: z.number().positive('Price must be positive'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  icon: z.string().min(1, 'Icon is required'),
  category: z.enum(['basic', 'premium', 'addon']),
  isActive: z.boolean().default(true),
})

export const ServiceTierSchema = z.enum(['basic', 'premium', 'addon'])

export const AddOnServiceSchema = z.object({
  id: z.string().min(1, 'Add-on ID is required'),
  name: z.string().min(1, 'Add-on name is required'),
  price: z.number().positive('Price must be positive'),
  description: z.string().min(1, 'Description is required'),
  compatibleWith: z.array(z.string()).optional(),
})

export type Service = z.infer<typeof ServiceSchema>
export type ServiceTier = z.infer<typeof ServiceTierSchema>
export type AddOnService = z.infer<typeof AddOnServiceSchema> 