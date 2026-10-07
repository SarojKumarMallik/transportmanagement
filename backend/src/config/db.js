import mongoose from 'mongoose';

let isConnecting = false;

// Disable Mongoose command buffering so queries fail quickly if DB is down instead of hanging 10000ms
mongoose.set('bufferCommands', false);

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection established.');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Scheduling reconnection attempt...');
  setTimeout(() => {
    connectDB();
  }, 5000);
});

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  if (isConnecting) return false;

  isConnecting = true;
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travel_db';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isConnecting = false;
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Notice: ${error.message}`);
    console.warn(`💡 Tip: Ensure MongoDB service is running (or check MONGODB_URI in backend/.env)`);
    isConnecting = false;
    // Auto-retry in 5 seconds
    setTimeout(() => {
      connectDB();
    }, 5000);
    return false;
  }
};

/**
 * Express middleware to prevent unhandled buffering timeouts when MongoDB is down
 */
export const checkDBConnection = (req, res, next) => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently offline. Please ensure MongoDB service is started.',
    });
  }
  next();
};
