import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../../../../packages/database/src/index';
import { Hackathon } from '../../../../packages/database/src/models/Hackathon';

dotenv.config();

const mockHackathons = [
  {
    title: 'Global AI Summit 2026',
    description: 'Join the brightest minds to solve real-world problems using Artificial Intelligence. Build next-gen LLM applications, computer vision models, and predictive analytics tools.',
    banner: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    startDate: new Date('2026-08-15'),
    endDate: new Date('2026-08-17'),
    registrationDeadline: new Date('2026-08-10'),
    mode: 'ONLINE',
    teamRules: { maxTeamSize: 4, minTeamSize: 2 },
    prizePool: 50000,
    tracks: [
      { name: 'Generative AI', description: 'Build innovative gen-AI apps', prize: '$20,000' },
      { name: 'AI for Good', description: 'Solve climate change or healthcare issues', prize: '$15,000' }
    ],
    sponsors: [
      { name: 'TechCorp', logo: 'https://placeholder.com/150', tier: 'Platinum' }
    ],
    status: 'LIVE'
  },
  {
    title: 'Web3 Innovators Hack',
    description: 'Shape the decentralized future. Build dApps, smart contracts, and Web3 infrastructure that scales securely.',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec674?auto=format&fit=crop&q=80&w=1000',
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-09-03'),
    registrationDeadline: new Date('2026-08-25'),
    mode: 'HYBRID',
    location: 'San Francisco, CA',
    teamRules: { maxTeamSize: 5, minTeamSize: 1 },
    prizePool: 25000,
    tracks: [
      { name: 'DeFi', description: 'Decentralized Finance solutions', prize: '$10,000' }
    ],
    sponsors: [],
    status: 'PUBLISHED'
  },
  {
    title: 'FinTech Revolution',
    description: 'Disrupt the financial industry. Create seamless payment gateways, robust trading algorithms, or innovative banking solutions.',
    banner: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-07-03'),
    registrationDeadline: new Date('2026-06-25'),
    mode: 'ONLINE',
    teamRules: { maxTeamSize: 4, minTeamSize: 2 },
    prizePool: 15000,
    tracks: [],
    sponsors: [],
    status: 'COMPLETED'
  }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon-v2';
    await connectDB(MONGO_URI);
    
    console.log('Connected to MongoDB. Clearing old hackathons...');
    await Hackathon.deleteMany({});
    
    console.log('Inserting mock hackathons...');
    await Hackathon.insertMany(mockHackathons);
    
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
