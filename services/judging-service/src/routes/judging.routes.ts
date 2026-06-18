import { Router } from 'express';
import { 
  assignJudge, 
  submitScore, 
  getLeaderboard,
  getJudgeAssignments
} from '../controllers/judging.controller';

const router = Router();

router.post('/assign', assignJudge); // Admin route
router.post('/scores', submitScore); // Judge route
router.get('/leaderboard/:hackathonId', getLeaderboard); // Public or Admin route
router.get('/assignments/:judgeId', getJudgeAssignments); // Judge route

export default router;
