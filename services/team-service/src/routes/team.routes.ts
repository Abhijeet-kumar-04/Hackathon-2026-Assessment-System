import { Router } from 'express';
import { createTeam, joinTeam, getTeam } from '../controllers/team.controller';

const router = Router();

router.post('/', createTeam);
router.post('/join', joinTeam);
router.get('/:id', getTeam);

export default router;
