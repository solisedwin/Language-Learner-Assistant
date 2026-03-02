import type { Request, Response } from 'express';
import { AudioService } from '../services/AudioService.ts';
import { ConversationsService } from '../services/ConversationsService';
import type {RoleplayScenario}  from '@shared/types/RoleplayScenario'
import crypto from "crypto";
import { TranslationService } from '../services/TranslationService.ts';

const audioService  = new AudioService();
const conversationService = new ConversationsService();
const translationService = new TranslationService();

export const startConversation = async (req: Request, res: Response) => {
    const roleplayScenario : RoleplayScenario = req.body.scenario;
    const text = await conversationService.startConversation(roleplayScenario);
    let translatedText;
    if(text){
        translatedText = await translationService.translateToEnglish(text);
    }
    const audioBuffer = await audioService.textToSpeech(text);
    const tempAudioSpeechID =  await audioService.cacheAudioSpeech(audioBuffer);
    const audioURLSrc = `api/converse/audiospeech/${tempAudioSpeechID}`;
 
    res.json( {
        text:text,
        translation: translatedText,
        audioURLSrc: audioURLSrc
    });
};

export const continueConverse = async (req: Request, res: Response) => {
    const germanText = req.body.germanText;
}

export const getAudioSpeech = async (req: Request, res: Response) => {
    const audioSpeechID = req.params.id as crypto.UUID;
    const audioSpeechBuffer = await audioService.getCachedAudioSpeech(audioSpeechID);
    
    res.set({
        "Content-Type": "audio/wav",
        "Content-Length": audioSpeechBuffer.length
    });

    res.send(audioSpeechBuffer);
};

