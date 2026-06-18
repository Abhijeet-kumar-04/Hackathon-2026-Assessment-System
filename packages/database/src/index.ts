import mongoose from 'mongoose';

export const connectDB = async (uri: string) => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(uri);
};

export * from './models/User';
export * from './models/Hackathon';
export * from './models/Team';
export * from './models/Submission';
export * from './models/Judge';
