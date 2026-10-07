import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB, checkDBConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow frontend & admin apps
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint (always reachable to inspect status)
app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: isConnected ? 'OK' : 'DEGRADED',
    database: isConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// Guard API routes so they return an informative 503 instead of hanging or timing out if MongoDB is down
app.use('/api', checkDBConnection);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    name: 'Travel MERN Platform API',
    status: 'online',
    database: isConnected ? 'connected' : 'disconnected',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      tours: '/api/tours',
      bookings: '/api/bookings',
      admin: '/api/admin',
      health: '/api/health',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Travel Backend running on http://localhost:${PORT}`);
});

export default app;
