import type { Request, Response } from "express";
import { audioService, conversationService, translationService } from "./../containers/services.ts";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import crypto from "crypto";
import type { ConversationExchange, AIAudioURL } from "@shared/types/Conversation.ts";

export const startConversation = async (req: Request, res: Response) => {
  const roleplayScenario: RoleplayScenario = req.body.scenario;
  const AIResponseText = await conversationService.startConversation(roleplayScenario);
  const conversationResponse: ConversationExchange = await converse(AIResponseText);
  res.json(conversationResponse);
};

export const continueConversation = async (req: Request, res: Response) => {
  const transcript = req.body.speechTranscript;
  const promptResponse = await conversationService.continueConversation(transcript);
  const AIResponseText = promptResponse.outputText;
  const conversationResponse: ConversationExchange = await converse(AIResponseText);
  res.json(conversationResponse);
};

export const converse = async (AIResponseText: string): Promise<ConversationExchange> => {
  const translatedText = await translationService.translateToEnglish(AIResponseText);
  const audioBuffer = await audioService.textToSpeech(AIResponseText);
  const tempAudioSpeechID = await audioService.cacheAudioSpeech(audioBuffer);
  const audioURLSrc: AIAudioURL = `api/converse/audiospeech/${tempAudioSpeechID}`;

  // TODO: Use res.json instead
  return {
    languageText: AIResponseText,
    englishTranslation: translatedText,
    audioURLSrc: audioURLSrc,
  };
};

export const getAudioSpeech = async (req: Request, res: Response) => {
  const audioSpeechID = req.params.id as crypto.UUID;
  const audioSpeechBuffer = await audioService.getCachedAudioSpeech(audioSpeechID);
  res.set({
    "Content-Type": "audio/wav",
    "Content-Length": audioSpeechBuffer.length,
  });
  res.send(audioSpeechBuffer);
};

export const audioUploadPermissions = async (req: Request, res: Response) => {
  const url = await audioService.getPreSignedUrl();
  res.send(url);
};
