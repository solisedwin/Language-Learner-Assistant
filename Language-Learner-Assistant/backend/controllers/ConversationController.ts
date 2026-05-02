import type { Request, Response } from "express";
import { AudioService } from "../services/AudioService.ts";
import { ConversationsService } from "../services/ConversationsService";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import crypto from "crypto";
import { TranslationService } from "../services/TranslationService.ts";
import type { ConversationExchange, AIAudioURL } from "@shared/types/Conversation.ts";

const audioService = new AudioService();
const conversationService = new ConversationsService();
const translationService = new TranslationService();

export const startConversation = async (req: Request, res: Response) => {
  const roleplayScenario: RoleplayScenario = req.body.scenario;
  const germanTextAIResponse = await conversationService.startConversation(roleplayScenario);
  const conversationResponse: ConversationExchange = await converse(germanTextAIResponse);
  res.json(conversationResponse);
};

export const continueConversation = async (req: Request, res: Response) => {
  const germanTextResponse = req.body.speechTranscript;
  const AIResponseText = await conversationService.continueConversation(germanTextResponse);
  const conversationResponse: ConversationExchange = await converse(AIResponseText);
  res.json(conversationResponse);
};

export const converse = async (germanTextAIResponse: string): Promise<ConversationExchange> => {
  const translatedText = await translationService.translateToEnglish(germanTextAIResponse);
  const audioBuffer = await audioService.textToSpeech(germanTextAIResponse);
  const tempAudioSpeechID = await audioService.cacheAudioSpeech(audioBuffer);
  const audioURLSrc: AIAudioURL = `api/converse/audiospeech/${tempAudioSpeechID}`;

  // TODO: Use res.json instead
  return {
    germanText: germanTextAIResponse,
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
  const url = await conversationService.getPreSignedUrl();
  res.send(url);
};
