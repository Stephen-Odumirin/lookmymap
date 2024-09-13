import express from 'express';
import {
  createMap,
  getMaps,
  getMapById,
  updateMap,
  deleteMap,
} from '../controllers/mapController.js';
import { authenticateToken } from '../middleware/auth.js';
import uploadMapFile from '../middleware/uploadMapMiddleware.js';

const router = express.Router();

// Routes
router.post('/', uploadMapFile, createMap); // Handle city addition
router.get('/', getMaps); // Get all maps
router.get('/:id', getMapById); // Get map by ID
router.put('/:id', uploadMapFile, updateMap); // Update map
router.delete('/:id', deleteMap); // Delete map

export default router;
