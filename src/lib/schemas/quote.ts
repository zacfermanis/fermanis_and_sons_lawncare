import { z } from 'zod'

export const PropertySizeSchema = z.enum(['small', 'medium', 'large', 'xlarge'])

export const ServiceTypeSchema = z.enum(['basic', 'premium', 'custom'])

export const QuoteRequestSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a 10-digit phone number'),
  address: z.string().min(5, 'Please enter a valid address'),
  serviceType: ServiceTypeSchema,
  propertySize: PropertySizeSchema,
  additionalServices: z.array(z.string()).optional(),
  message: z.string().optional(),
  preferredContactMethod: z.enum(['phone', 'email', 'text']).default('phone'),
  preferredCallTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).default('anytime'),
  urgency: z.enum(['asap', 'this_week', 'next_week', 'flexible']).default('flexible'),
})

export const QuoteResponseSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  serviceType: ServiceTypeSchema,
  propertySize: PropertySizeSchema,
  basePrice: z.number().positive(),
  addOnPrice: z.number().min(0).default(0),
  totalPrice: z.number().positive(),
  validUntil: z.date(),
  status: z.enum(['draft', 'sent', 'accepted', 'rejected', 'expired']).default('draft'),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const QuotePriceSchema = z.object({
  basePrice: z.number().positive(),
  addOnPrice: z.number().min(0).default(0),
  totalPrice: z.number().positive(),
  breakdown: z.array(z.object({
    item: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
  })),
})

export type PropertySize = z.infer<typeof PropertySizeSchema>
export type ServiceType = z.infer<typeof ServiceTypeSchema>
export type QuoteRequest = z.infer<typeof QuoteRequestSchema>
export type QuoteResponse = z.infer<typeof QuoteResponseSchema>
export type QuotePrice = z.infer<typeof QuotePriceSchema> 