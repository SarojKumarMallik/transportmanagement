import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserByAdmin,
} from '../controllers/adminController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, requireAdmin);

router.get('/dashboard-stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUserByAdmin);

export default router;
