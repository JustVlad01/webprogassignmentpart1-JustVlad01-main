import { ObjectId } from 'mongodb';

export interface Car {
  _id?: ObjectId;
  brand: string;
  model: string;
  year: number;
  mileage: number;
}
