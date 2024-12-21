import express from 'express';
import { authenticateKey } from '../middleware/auth.middleware';
import { carSchema } from '../middleware/validate';
import { createCar, deleteCar, getCarById, getCars, updateCar } from '../controllers/carsController';
import { validateCar } from '../middleware/validate';

const router = express.Router();

// Define routes with authentication and validation
router.get('/', authenticateKey, getCars);
router.get('/:id', authenticateKey, getCarById);
router.post('/', authenticateKey, validateCar, createCar);
router.put('/:id', authenticateKey, validateCar, updateCar);
router.delete('/:id', authenticateKey, deleteCar);

export default router;
