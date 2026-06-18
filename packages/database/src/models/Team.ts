import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  teamName: string;
  hackathonId: Types.ObjectId;
  leader: Types.ObjectId;
  members: { userId: Types.ObjectId; role: string; joinedAt: Date }[];
  invitedMembers: { email: string; status: 'PENDING' | 'ACCEPTED' }[];
  teamCode: string;
  projectTitle?: string;
  status: 'INCOMPLETE' | 'READY' | 'REGISTERED' | 'DISQUALIFIED';
}

const TeamSchema = new Schema<ITeam>({
  teamName: { type: String, unique: true, required: true },
  hackathonId: { type: Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  leader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, default: 'MEMBER' },
    joinedAt: { type: Date, default: Date.now }
  }],
  invitedMembers: [{
    email: { type: String },
    status: { type: String, enum: ['PENDING', 'ACCEPTED'], default: 'PENDING' }
  }],
  teamCode: { type: String, unique: true, required: true },
  projectTitle: { type: String },
  status: { type: String, enum: ['INCOMPLETE', 'READY', 'REGISTERED', 'DISQUALIFIED'], default: 'INCOMPLETE' }
}, { timestamps: true });

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
