import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routing map for microservices
const services = {
  auth: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  users: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  hackathons: process.env.HACKATHON_SERVICE_URL || 'http://localhost:3002',
  teams: process.env.TEAM_SERVICE_URL || 'http://localhost:3003',
  registrations: process.env.TEAM_SERVICE_URL || 'http://localhost:3003',
  submissions: process.env.SUBMISSION_SERVICE_URL || 'http://localhost:3004',
  judging: process.env.JUDGING_SERVICE_URL || 'http://localhost:3005',
  notifications: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3006',
  ai: process.env.AI_SERVICE_URL || 'http://localhost:3007',
};

// Apply proxy middleware
Object.entries(services).forEach(([name, target]) => {
  app.use(`/api/v1/${name}`, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl,
  }));
});

app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running', services });
});

app.listen(PORT, () => {
  console.log(`API Gateway started on port ${PORT}`);
});
