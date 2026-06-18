import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubmission extends Document {
  teamId: Types.ObjectId;
  hackathonId: Types.ObjectId;
  round: number;
  githubLink: string;
  demoVideo?: string;
  pptLink?: string;
  description: string;
  submittedAt: Date;
  isLocked: boolean;
}

const SubmissionSchema = new Schema<ISubmission>({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  hackathonId: { type: Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  round: { type: Number, default: 1 },
  githubLink: { type: String, required: true },
  demoVideo: { type: String },
  pptLink: { type: String },
  description: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  isLocked: { type: Boolean, default: false }
}, { timestamps: true });

export const Submission = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
