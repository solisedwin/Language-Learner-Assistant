import { Router} from 'express'
import {converse} from '../controllers/OpenAIController.ts';

const router = Router();
router.post('/converse', converse);

export default router;