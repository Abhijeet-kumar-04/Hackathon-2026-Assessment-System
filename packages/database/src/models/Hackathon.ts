import mongoose, { Schema, Document } from 'mongoose';

export interface IHackathon extends Document {
  title: string;
  description: string;
  banner?: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  location?: string;
  teamRules: { maxTeamSize: number; minTeamSize: number };
  prizePool?: number;
  tracks: { name: string; description: string; prize: string }[];
  sponsors: { name: string; logo: string; tier: string }[];
  status: 'DRAFT' | 'PUBLISHED' | 'LIVE' | 'COMPLETED' | 'CLOSED';
}

const HackathonSchema = new Schema<IHackathon>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: { type: Date, required: true },
  mode: { type: String, enum: ['ONLINE', 'OFFLINE', 'HYBRID'], required: true },
  location: { type: String },
  teamRules: {
    maxTeamSize: { type: Number, required: true },
    minTeamSize: { type: Number, required: true },
  },
  prizePool: { type: Number },
  tracks: [{
    name: { type: String },
    description: { type: String },
    prize: { type: String },
  }],
  sponsors: [{
    name: { type: String },
    logo: { type: String },
    tier: { type: String },
  }],
  status: { 
    type: String, 
    enum: ['DRAFT', 'PUBLISHED', 'LIVE', 'COMPLETED', 'CLOSED'],
    default: 'DRAFT' 
  },
}, { timestamps: true });

export const Hackathon = mongoose.models.Hackathon || mongoose.model<IHackathon>('Hackathon', HackathonSchema);
