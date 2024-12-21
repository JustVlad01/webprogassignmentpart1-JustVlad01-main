import { Request, Response, NextFunction } from 'express';

export const authenticateKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];


  next();
};
