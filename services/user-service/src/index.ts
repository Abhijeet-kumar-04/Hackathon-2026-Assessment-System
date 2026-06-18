import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { connectDB } from '../../../packages/database/src/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Webhooks need raw body, so we apply express.json() AFTER the webhook route if needed
app.use('/api/v1/auth', authRoutes);

// For other routes
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'User Service is running' });
});

const startService = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon-v2';
    await connectDB(MONGO_URI);
    console.log('User Service connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`User Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start User Service:', error);
  }
};

startService();
