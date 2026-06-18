import { Router } from 'express';
import { 
  createHackathon, 
  getHackathons, 
  getHackathonById, 
  updateHackathonStatus 
} from '../controllers/hackathon.controller';

const router = Router();

// In a real production system, POST/PUT routes would be protected by an Admin middleware
router.post('/', createHackathon);
router.get('/', getHackathons);
router.get('/:id', getHackathonById);
router.put('/:id/status', updateHackathonStatus);

export default router;
