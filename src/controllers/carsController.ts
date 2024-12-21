import { Request, Response } from 'express';
import { carsCollection } from '../config/database';
import { Car } from '../models/car';
import { ObjectId } from 'mongodb';

// Get all cars with filtering and sorting
export const getCars = async (req: Request, res: Response) => {
  try {
    // Destructure query parameters for filtering
    const { brand, model, year, sortBy, order = 'asc' } = req.query;

    // Create a filter object for MongoDB queries
    const filter: any = {};
    if (brand) filter.brand = brand;
    if (model) filter.model = model;
    if (year) filter.year = parseInt(year as string, 10);

    // Create a sort object for MongoDB queries (1 for ascending, -1 for descending)
    const sortOrder = order === 'desc' ? -1 : 1;
    const sort: any = {};
    if (sortBy) {
      sort[sortBy as string] = sortOrder;
    }

    // Query the collection with the filter and sort options
    const cars = await carsCollection.find(filter).sort(sort).toArray();

    // Return the filtered and sorted results
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

// Get a car by ID
export const getCarById = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const car = await carsCollection.findOne({ _id: id });

    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).send(`No car found with id: ${req.params.id}`);
    }
  } catch (error) {
    res.status(500).send(`Error retrieving car with id: ${req.params.id}`);
  }
};

// Create a new car
export const createCar = async (req: Request, res: Response) => {
  try {
    const newCar = req.body as Car;
    const result = await carsCollection.insertOne(newCar);

    if (result.insertedId) {
      // Retrieve the created car data from the database to return it
      const createdCar = await carsCollection.findOne({ _id: result.insertedId });
      if (createdCar) {
        // Send back the entire car data, including the insertedId
        res.status(201).json({
          message: 'Car created successfully',
          car: createdCar // Return the full car object
        });
      } else {
        res.status(500).send('Failed to retrieve the created car.');
      }
    } else {
      res.status(500).send('Failed to create a new car.');
    }
  } catch (error) {
    res.status(400).send('Unable to create a new car.');
  }
};


// Update a car by ID
export const updateCar = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await carsCollection.updateOne({ _id: id }, { $set: req.body });

    if (result.matchedCount > 0) {
      res.status(200).json({ message: `Car with id ${id} updated successfully` });
    } else {
      res.status(404).json({ message: `No car found with id ${id}` });
    }
  } catch (error) {
    res.status(500).send('An error occurred while updating the car.');
  }
};

// Delete a car by ID
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await carsCollection.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(202).json({ message: `Successfully removed car with id ${id}` });
    } else {
      res.status(404).json({ message: `No car found with id ${id}` });
    }
  } catch (error) {
    res.status(500).send('Error deleting car.');
  }
};
