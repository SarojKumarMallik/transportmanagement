import express from 'express';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.put('/:id/cancel', protect, cancelBooking);

// Admin-only routes
router.get('/', protect, requireAdmin, getAllBookings);
router.put('/:id/status', protect, requireAdmin, updateBookingStatus);

export default router;
