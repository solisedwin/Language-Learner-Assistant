import { Router } from "express";
import {
  startConversation,
  continueConversation,
  getAudioSpeech,
} from "../controllers/ConversationController";

const router = Router();
router.post("", startConversation);
router.post("/continue-conversation", continueConversation);
router.get("/audiospeech/:id", getAudioSpeech);

export default router;
