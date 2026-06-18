import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'JUDGE' | 'ORGANIZER';
  profileImage?: string;
  college?: string;
  branch?: string;
  year?: string;
  phone?: string;
  socials?: { github?: string; linkedin?: string; website?: string };
  skills?: string[];
  resumeURL?: string;
  isVerified: boolean;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ['STUDENT', 'ADMIN', 'JUDGE', 'ORGANIZER'], default: 'STUDENT' },
  profileImage: { type: String },
  college: { type: String },
  branch: { type: String },
  year: { type: String },
  phone: { type: String },
  socials: {
    github: { type: String },
    linkedin: { type: String },
    website: { type: String },
  },
  skills: [{ type: String }],
  resumeURL: { type: String },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
