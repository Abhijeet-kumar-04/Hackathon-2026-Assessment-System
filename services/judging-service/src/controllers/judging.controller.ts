import { Request, Response } from 'express';
import { Judge, Score } from '../../../../packages/database/src/models/Judge';
import { Submission } from '../../../../packages/database/src/models/Submission';
import { Team } from '../../../../packages/database/src/models/Team';

export const assignJudge = async (req: Request, res: Response) => {
  try {
    const { userId, hackathonId, expertise, assignedTeams } = req.body;

    const judge = new Judge({
      userId,
      hackathonId,
      expertise,
      assignedTeams
    });

    await judge.save();
    return res.status(201).json({ success: true, judge });
  } catch (error) {
    console.error('Error assigning judge:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const submitScore = async (req: Request, res: Response) => {
  try {
    const { judgeId, teamId, hackathonId, submissionId, scores, feedback } = req.body;

    // Validate if the team exists and made a submission
    const submission = await Submission.findById(submissionId);
    if (!submission || submission.teamId.toString() !== teamId) {
      return res.status(404).json({ error: 'Submission not found for this team' });
    }

    // Calculate total score based on weights or direct sum
    // (Innovation, UIUX, Technicality, Impact, Presentation)
    const totalScore = 
      (scores.innovation || 0) + 
      (scores.uiux || 0) + 
      (scores.technicality || 0) + 
      (scores.impact || 0) + 
      (scores.presentation || 0);

    // Upsert the score
    const score = await Score.findOneAndUpdate(
      { judgeId, submissionId },
      {
        judgeId,
        teamId,
        hackathonId,
        submissionId,
        scores,
        totalScore,
        feedback
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, score });
  } catch (error) {
    console.error('Error submitting score:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { hackathonId } = req.params;

    // Aggregate scores by teamId and calculate average totalScore
    const leaderboard = await Score.aggregate([
      { $match: { hackathonId: req.params.hackathonId } }, // Match strings/objectIDs appropriately in production
      {
        $group: {
          _id: '$teamId',
          averageScore: { $avg: '$totalScore' },
          judgesCount: { $sum: 1 }
        }
      },
      { $sort: { averageScore: -1 } }
    ]);

    // Populate team details
    await Team.populate(leaderboard, { path: '_id', select: 'teamName projectTitle' });

    return res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    console.error('Error generating leaderboard:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getJudgeAssignments = async (req: Request, res: Response) => {
  try {
    const { judgeId } = req.params;
    const judge = await Judge.findById(judgeId).populate('assignedTeams');
    
    if (!judge) {
      return res.status(404).json({ error: 'Judge not found' });
    }

    return res.status(200).json({ success: true, assignments: judge.assignedTeams });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
