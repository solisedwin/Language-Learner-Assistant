import { Router} from 'express'
import {generateConversation, getAudioSpeech} from '../controllers/ConversationController';

const router = Router();
router.post('', generateConversation);
router.get('/audiospeech/:id', getAudioSpeech);

export default router;