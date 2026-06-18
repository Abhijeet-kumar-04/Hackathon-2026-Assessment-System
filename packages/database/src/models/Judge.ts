import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IJudge extends Document {
  userId: Types.ObjectId;
  hackathonId: Types.ObjectId;
  expertise: string[];
  assignedTeams: Types.ObjectId[];
}

const JudgeSchema = new Schema<IJudge>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hackathonId: { type: Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  expertise: [{ type: String }],
  assignedTeams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
}, { timestamps: true });

export const Judge = mongoose.models.Judge || mongoose.model<IJudge>('Judge', JudgeSchema);

export interface IScore extends Document {
  judgeId: Types.ObjectId;
  teamId: Types.ObjectId;
  hackathonId: Types.ObjectId;
  submissionId: Types.ObjectId;
  scores: {
    innovation: number;
    uiux: number;
    technicality: number;
    impact: number;
    presentation: number;
  };
  totalScore: number;
  feedback: string;
}

const ScoreSchema = new Schema<IScore>({
  judgeId: { type: Schema.Types.ObjectId, ref: 'Judge', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  hackathonId: { type: Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', required: true },
  scores: {
    innovation: { type: Number, min: 1, max: 10, required: true },
    uiux: { type: Number, min: 1, max: 10, required: true },
    technicality: { type: Number, min: 1, max: 10, required: true },
    impact: { type: Number, min: 1, max: 10, required: true },
    presentation: { type: Number, min: 1, max: 10, required: true },
  },
  totalScore: { type: Number, required: true },
  feedback: { type: String }
}, { timestamps: true });

export const Score = mongoose.models.Score || mongoose.model<IScore>('Score', ScoreSchema);
