import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';
import { Car } from '../models/car';

dotenv.config();

const connectionString: string = process.env.DB_CONN_STRING;
const dbName: string = process.env.DB_NAME || 'web2_2024';

if (!connectionString) {
  throw new Error('DB_CONN_STRING is not defined in the environment variables.');
}

const client = new MongoClient(connectionString);

let db: Db;
export let carsCollection: Collection<Car>;

export const connectToDatabase = async (): Promise<void> => {
  try {
    await client.connect();
    db = client.db(dbName);
    carsCollection = db.collection<Car>('cars');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
