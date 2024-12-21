import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Car schema validation using Joi with updated rules for mileage and year
export const carSchema = Joi.object({
  brand: Joi.string().min(2).max(30).required().messages({
    'string.min': 'Brand should have at least 2 characters',
    'string.max': 'Brand should not exceed 30 characters',
    'any.required': 'Brand is required',
  }),
  model: Joi.string().min(2).max(30).required().messages({
    'string.min': 'Model should have at least 2 characters',
    'string.max': 'Model should not exceed 30 characters',
    'any.required': 'Model is required',
  }),
  year: Joi.number().integer().min(1870).max(2024).required().messages({
    'number.base': 'Year must be a valid number',
    'number.min': 'Year cannot be earlier than 1870',
    'number.max': 'Year cannot be later than 2024',
    'any.required': 'Year is required',
  }),
  mileage: Joi.number().min(0).max(500000).required().messages({
    'number.base': 'Mileage must be a valid number',
    'number.min': 'Mileage cannot be a negative value',
    'number.max': 'Mileage cannot exceed 500,000',
    'any.required': 'Mileage is required',
  }),
});

// Middleware function to validate car data
export const validateCar = (req: Request, res: Response, next: NextFunction) => {
  const { error } = carSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message); // Send the validation error message
  }
  next();
};
