import express, { type Express } from 'express';
import { bookingSchema } from "@shared/schema";
import { storage } from "./storage";
import { type Server } from "http";
import { createServer } from "http";

export function registerRoutes(app: Express): Server {
  const router = express.Router();

  // Example: Get all bookings
  router.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error getting bookings:", error);
      res.status(500).json({ error: "Failed to get bookings" });
    }
  });

  // Example: Create a new booking
  router.post('/api/bookings', async (req, res) => {
    try {
      const validatedBooking = bookingSchema.parse(req.body);
      const newBooking = await storage.createBooking(validatedBooking);
      res.status(201).json(newBooking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  app.use(router);
  return createServer(app);
}