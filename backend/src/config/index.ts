import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://hk:harsh12345@marketing-automation.ikalmut.mongodb.net/?retryWrites=true&w=majority&appName=marketing-automation',
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  emailUser: process.env.EMAIL_USER || 'noreply@example.com',
  emailPassword: process.env.EMAIL_PASSWORD || 'your-email-password'
}; 