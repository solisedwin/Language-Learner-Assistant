import { Router } from "express";
import {
  startConversation,
  continueConversation,
  getAudioSpeech,
  audioUploadPermissions,
} from "../controllers/ConversationController";

const router = Router();
router.post("", startConversation);
router.post("/continue-conversation", continueConversation);
router.get("/audiospeech/:id", getAudioSpeech);
router.post("/audioUploadPermissions", audioUploadPermissions);

export default router;
