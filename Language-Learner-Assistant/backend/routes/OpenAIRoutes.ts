import { Router} from 'express'
import {generateTextResponse} from '../controllers/OpenAIController.ts';

const router = Router();
router.post('/', generateTextResponse);

export default router;