import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors package
import carRoutes from './routes/cars';

import { connectToDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectToDatabase();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/v1/cars', carRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
