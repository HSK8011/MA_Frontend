import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import integrationRoutes from './routes/integrationRoutes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/userRoutes';
import settingsRoutes from './routes/settings';

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Match your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Total-Count']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/connect', integrationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);

export default app; 