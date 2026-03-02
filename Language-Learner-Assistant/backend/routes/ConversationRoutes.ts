import { Router} from 'express'
import {startConversation, getAudioSpeech} from '../controllers/ConversationController';

const router = Router();
router.post('', startConversation);
router.get('/audiospeech/:id', getAudioSpeech);

export default router;