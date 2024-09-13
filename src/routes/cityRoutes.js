import express from 'express';
import {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
} from '../controllers/cityController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCities);
router.post('/', createCity);
router.get('/:id', getCityById);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;
