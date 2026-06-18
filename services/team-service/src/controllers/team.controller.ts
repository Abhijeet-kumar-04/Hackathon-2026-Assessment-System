import { Request, Response } from 'express';
// We import from the shared database package
import { Team } from '../../../../packages/database/src/models/Team';
import { User } from '../../../../packages/database/src/models/User';

// Helper to generate a random 6-character alphanumeric code
const generateTeamCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { teamName, hackathonId, userId } = req.body;

    if (!teamName || !hackathonId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if team name already exists
    const existingTeam = await Team.findOne({ teamName, hackathonId });
    if (existingTeam) {
      return res.status(400).json({ error: 'Team name already taken in this hackathon' });
    }

    // Check if user is already in a team for this hackathon
    const userInTeam = await Team.findOne({ hackathonId, 'members.userId': userId });
    if (userInTeam) {
      return res.status(400).json({ error: 'You are already in a team for this hackathon' });
    }

    const team = new Team({
      teamName,
      hackathonId,
      leader: userId,
      members: [{ userId, role: 'LEADER' }],
      teamCode: generateTeamCode(),
      status: 'INCOMPLETE'
    });

    await team.save();
    return res.status(201).json({ success: true, team });
  } catch (error) {
    console.error('Error creating team:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const joinTeam = async (req: Request, res: Response) => {
  try {
    const { teamCode, userId } = req.body;

    if (!teamCode || !userId) {
      return res.status(400).json({ error: 'Missing teamCode or userId' });
    }

    const team = await Team.findOne({ teamCode });
    if (!team) {
      return res.status(404).json({ error: 'Invalid team code' });
    }

    // Check if user is already in this team
    const isMember = team.members.find(m => m.userId.toString() === userId);
    if (isMember) {
      return res.status(400).json({ error: 'You are already in this team' });
    }

    // Optional: We would also check hackathon maxTeamSize here by querying Hackathon model
    // For now, add user to team
    team.members.push({ userId, role: 'MEMBER', joinedAt: new Date() });
    
    // Update status if it meets requirements (simplified logic)
    if (team.members.length >= 2) {
      team.status = 'READY';
    }

    await team.save();
    return res.status(200).json({ success: true, team });
  } catch (error) {
    console.error('Error joining team:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('leader').populate('members.userId');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    return res.status(200).json({ success: true, team });
  } catch (error) {
    console.error('Error fetching team:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
