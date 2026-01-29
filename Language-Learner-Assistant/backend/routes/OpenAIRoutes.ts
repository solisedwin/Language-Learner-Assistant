import { Router} from 'express'
import {generateTextResponse} from '../controllers/OpenAIController.ts';
import {textToSpeech} from '../controllers/TextToSpeechController.ts'

const router = Router();
router.post('/converse', generateTextResponse);
router.post('/audio', textToSpeech);

export default router;