import { z } from 'zod'

export const ServiceSchema = z.object({
  id: z.string().min(1, 'Service ID is required'),
  name: z.string().min(1, 'Service name is required'),
  description: z.string().min(1, 'Service description is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  price: z.union([z.number().positive(), z.string()]).optional(),
  priceNote: z.string().optional(),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  icon: z.string().min(1, 'Icon is required'),
  category: z.enum(['maintenance', 'treatments', 'landscaping', 'cleanup']),
  isActive: z.boolean().default(true),
  seasonalService: z.boolean().default(false),
})

export const ServiceCategorySchema = z.enum(['maintenance', 'treatments', 'landscaping', 'cleanup'])

export const AddOnServiceSchema = z.object({
  id: z.string().min(1, 'Add-on ID is required'),
  name: z.string().min(1, 'Add-on name is required'),
  price: z.union([z.number().positive(), z.string()]),
  description: z.string().min(1, 'Description is required'),
  compatibleWith: z.array(z.string()).optional(),
})

export type Service = z.infer<typeof ServiceSchema>
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>
export type AddOnService = z.infer<typeof AddOnServiceSchema> 