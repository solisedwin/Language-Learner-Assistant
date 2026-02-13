import type { Request, Response } from 'express';
import { AudioService } from '../services/AudioService.ts';
import { ConversationsService } from '../services/ConversationsService';
import type {RoleplayScenario}  from '../scenarios/types.ts';
import crypto from "crypto";

const audioService  = new AudioService();
const conversationService = new ConversationsService();

export const generateConversation = async (req: Request, res: Response) => {
    const roleplayScenario : RoleplayScenario = req.body.scenario;
    const text = await conversationService.startConversation(roleplayScenario);
    const audioBuffer = await audioService.textToSpeech(text);
    const tempAudioSpeechID =  await audioService.cacheAudioSpeech(audioBuffer);
    const audioURLSrc = `api/converse/audiospeech/${tempAudioSpeechID}`;

    res.json( {
        text:text,
        audioURLSrc: audioURLSrc
    });
};

export const getAudioSpeech = async (req: Request, res: Response) => {
    const audioSpeechID = req.params.id as crypto.UUID;
    const audioSpeechBuffer = await audioService.getCachedAudioSpeech(audioSpeechID);
    
    res.set({
        "Content-Type": "audio/wav",
        "Content-Length": audioSpeechBuffer.length
    });

    res.send(audioSpeechBuffer);
};

