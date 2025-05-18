import mongoose from 'mongoose';
import { config } from './index';

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Using MongoDB URI:', config.mongodbUri);
    
    await mongoose.connect(config.mongodbUri);
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 