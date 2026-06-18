import { Request, Response } from 'express';
import { Submission } from '../../../../packages/database/src/models/Submission';
import { Team } from '../../../../packages/database/src/models/Team';

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { teamId, hackathonId, githubLink, demoVideo, pptLink, description, round = 1 } = req.body;

    if (!teamId || !hackathonId || !githubLink || !description) {
      return res.status(400).json({ error: 'Missing required submission fields' });
    }

    // Verify team exists and is registered for hackathon
    const team = await Team.findById(teamId);
    if (!team || team.hackathonId.toString() !== hackathonId) {
      return res.status(404).json({ error: 'Team not found or not registered for this hackathon' });
    }

    // Check if there is already a submission for this round
    const existingSubmission = await Submission.findOne({ teamId, round });
    if (existingSubmission && existingSubmission.isLocked) {
      return res.status(400).json({ error: 'Submission for this round is locked' });
    }

    if (existingSubmission) {
      // Update existing submission if not locked
      existingSubmission.githubLink = githubLink;
      existingSubmission.demoVideo = demoVideo;
      existingSubmission.pptLink = pptLink;
      existingSubmission.description = description;
      existingSubmission.submittedAt = new Date();
      await existingSubmission.save();
      return res.status(200).json({ success: true, submission: existingSubmission });
    }

    // Create new submission
    const submission = new Submission({
      teamId,
      hackathonId,
      round,
      githubLink,
      demoVideo,
      pptLink,
      description
    });

    await submission.save();
    return res.status(201).json({ success: true, submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id).populate('teamId');
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    return res.status(200).json({ success: true, submission });
  } catch (error) {
    console.error('Error fetching submission:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getSubmissionsByHackathon = async (req: Request, res: Response) => {
  try {
    const { hackathonId } = req.params;
    const submissions = await Submission.find({ hackathonId }).populate('teamId');
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const lockSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByIdAndUpdate(id, { isLocked: true }, { new: true });
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    return res.status(200).json({ success: true, submission });
  } catch (error) {
    console.error('Error locking submission:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
