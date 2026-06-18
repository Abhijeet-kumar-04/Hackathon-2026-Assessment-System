import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import hackathonRoutes from './routes/hackathon.routes';
import { connectDB } from '../../../packages/database/src/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002; // Matches API Gateway configuration

app.use(cors());
app.use(express.json());

app.use('/api/v1/hackathons', hackathonRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Hackathon Service is running' });
});

const startService = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon-v2';
    await connectDB(MONGO_URI);
    console.log('Hackathon Service connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Hackathon Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Hackathon Service:', error);
  }
};

startService();
