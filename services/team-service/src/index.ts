import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import teamRoutes from './routes/team.routes';
import { connectDB } from '../../../packages/database/src/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003; // Match port in API Gateway

app.use(cors());
app.use(express.json());

app.use('/api/v1/teams', teamRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Team Service is running' });
});

const startService = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon-v2';
    await connectDB(MONGO_URI);
    console.log('Team Service connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Team Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Team Service:', error);
  }
};

startService();
