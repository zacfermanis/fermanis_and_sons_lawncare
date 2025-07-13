import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a 10-digit phone number').optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContactMethod: z.enum(['phone', 'email']).default('email'),
})

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a 10-digit phone number').optional(),
  address: z.string().min(5, 'Please enter a valid address').optional(),
  propertySize: z.enum(['small', 'medium', 'large', 'xlarge']).optional(),
  serviceHistory: z.array(z.string()).default([]),
  preferredContactMethod: z.enum(['phone', 'email', 'text']).default('phone'),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const AddressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  country: z.string().default('US'),
})

export const BusinessHoursSchema = z.object({
  day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  isOpen: z.boolean(),
  openTime: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format').optional(),
  closeTime: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format').optional(),
})

export type ContactForm = z.infer<typeof ContactFormSchema>
export type Customer = z.infer<typeof CustomerSchema>
export type Address = z.infer<typeof AddressSchema>
export type BusinessHours = z.infer<typeof BusinessHoursSchema> 