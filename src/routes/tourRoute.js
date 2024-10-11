import express from 'express';
import {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';
import { authenticateToken } from '../middleware/auth.js';
import uploadTourFile from '../middleware/uploadTourMiddleware.js';

const router = express.Router();

// Routes
router.post('/', uploadTourFile, createTour); // Handle tour addition
router.get('/', getTours); // Get all tours
router.get('/:id', getTourById); // Get tour by ID
router.put('/:id', uploadTourFile, updateTour); // Update tour
router.delete('/:id', deleteTour); // Delete tour

export default router;