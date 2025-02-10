import { z } from "zod";

export const vehicleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  capacity: z.number(),
  hourlyRate: z.number(),
  imageUrl: z.string(),
  features: z.array(z.string())
});

export const bookingSchema = z.object({
  id: z.string().optional(),
  vehicleId: z.string(),
  pickupAddress: z.string(),
  dropoffAddress: z.string(),
  pickupTime: z.string(),
  duration: z.number(),
  totalPrice: z.number(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  status: z.string().default("pending")
});

export type Vehicle = z.infer<typeof vehicleSchema>;
export type Booking = z.infer<typeof bookingSchema>;