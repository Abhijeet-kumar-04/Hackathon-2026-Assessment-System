import { Request, Response } from 'express';
import { Hackathon } from '../../../../packages/database/src/models/Hackathon';

export const createHackathon = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    const hackathon = new Hackathon(data);
    await hackathon.save();

    return res.status(201).json({ success: true, hackathon });
  } catch (error: any) {
    console.error('Error creating hackathon:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getHackathons = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const hackathons = await Hackathon.find(filters).sort({ startDate: 1 });
    return res.status(200).json({ success: true, hackathons });
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getHackathonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hackathon = await Hackathon.findById(id);
    
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    return res.status(200).json({ success: true, hackathon });
  } catch (error) {
    console.error('Error fetching hackathon:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateHackathonStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['DRAFT', 'PUBLISHED', 'LIVE', 'COMPLETED', 'CLOSED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const hackathon = await Hackathon.findByIdAndUpdate(id, { status }, { new: true });
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    return res.status(200).json({ success: true, hackathon });
  } catch (error) {
    console.error('Error updating hackathon status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
