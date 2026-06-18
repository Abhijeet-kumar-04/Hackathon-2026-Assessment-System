import { Router } from 'express';
import { 
  createSubmission, 
  getSubmissionById, 
  getSubmissionsByHackathon,
  lockSubmission
} from '../controllers/submission.controller';

const router = Router();

router.post('/', createSubmission);
router.get('/:id', getSubmissionById);
router.get('/hackathon/:hackathonId', getSubmissionsByHackathon);
router.put('/:id/lock', lockSubmission); // Admin only route in production

export default router;
