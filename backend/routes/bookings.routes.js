import { Router } from "express";
import { addBookingToCalendar } from "../controller/calendar.controller.js";
import Booking from "../models/booking.model.js";

const bookingRouter = Router();

bookingRouter.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find(); // Or add filters if needed
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


bookingRouter.post("/", addBookingToCalendar);

export default bookingRouter;
