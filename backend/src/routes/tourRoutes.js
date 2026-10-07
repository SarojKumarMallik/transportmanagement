import express from 'express';
import {
  getTours,
  getTourById,
  getFeaturedTours,
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTours);
router.get('/featured/list', getFeaturedTours);
router.get('/:id', getTourById);

// Admin-protected routes
router.post('/', protect, requireAdmin, createTour);
router.put('/:id', protect, requireAdmin, updateTour);
router.delete('/:id', protect, requireAdmin, deleteTour);

export default router;
