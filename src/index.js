import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import listingRoutes from './routes/listingRoute.js';
import mapRoutes from './routes/mapRoute.js';
import cityRoutes from './routes/cityRoutes.js';
import tourRoutes from './routes/tourRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';  // Import fileURLToPath from 'url' module
import contactRoutes from './routes/contactRoute.js';

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Use CORS middleware to handle cross-origin requests
app.use(cors({
  origin: 'http://localhost:3000', //https://lookmyapp.vercel.app', // TODO Replace with your frontend's URL 'http://localhost:3000',//
  credentials: true, // Enable sending credentials
}));

// Parse JSON requests
app.use(express.json());

// Default route for root path
app.get('/', (req, res) => {
  res.send('Server is up and running as expected. #3.2');
});

// Set up route handlers
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tours',tourRoutes);

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/mapuploads', express.static(path.join(__dirname, '../mapuploads')));
app.use('/touruploads', express.static(path.join(__dirname, '../touruploads')));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
