import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import submissionRoutes from './routes/submission.routes';
import { connectDB } from '../../../packages/database/src/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

app.use('/api/v1/submissions', submissionRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Submission Service is running' });
});

const startService = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon-v2';
    await connectDB(MONGO_URI);
    console.log('Submission Service connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Submission Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Submission Service:', error);
  }
};

startService();
