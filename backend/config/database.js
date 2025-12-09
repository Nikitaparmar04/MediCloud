import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found (hidden for security)' : 'NOT FOUND - using localhost fallback');
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medicare_hub');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
