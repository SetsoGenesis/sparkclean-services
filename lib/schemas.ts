import { z } from 'zod'

export const bookingSchema = z.object({
  service_type: z.enum(['residential', 'deep_clean', 'airbnb', 'office']),
  property_size: z.enum(['studio', '1bed', '2bed', '3bed', 'larger']),
  preferred_date: z.string().min(1, 'Please select a date'),
  preferred_time: z.enum(['morning', 'afternoon']),
  full_name: z.string().min(2, 'Please enter your full name'),
  whatsapp: z.string().min(7, 'Please enter a valid WhatsApp number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().min(3, 'Please enter your address or area'),
  special_instructions: z.string().optional(),
})

export const callSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  best_time: z.enum(['morning', 'afternoon', 'evening']),
  topic: z.enum(['enquiry', 'quote', 'partnership', 'other']),
  message: z.string().optional(),
})

export const feedbackSchema = z.object({
  name: z.string().optional(),
  feedback_type: z.enum(['review', 'suggestion', 'complaint', 'comment', 'partnership']),
  rating: z.number().min(1).max(5).optional(),
  message: z.string().min(10, 'Please write at least 10 characters'),
  whatsapp: z.string().optional(),
})

export const contactSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  message: z.string().min(5, 'Please enter a message'),
})

export type BookingFormData = z.infer<typeof bookingSchema>
export type CallFormData = z.infer<typeof callSchema>
export type FeedbackFormData = z.infer<typeof feedbackSchema>
export type ContactFormData = z.infer<typeof contactSchema>
