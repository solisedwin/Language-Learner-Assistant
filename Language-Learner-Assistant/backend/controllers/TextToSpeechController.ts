import fs from "fs";
import path from "path";
import type { Request, Response } from 'express';
import { openAI } from '../services/OpenAIService';

export const textToSpeech = async (req: Request, res: Response) => {
    console.log('Making speech request to OpenAI');
    const speechFile = path.resolve("./speech.mp3");

    try {
        const mp3 = await openAI.audio.speech.create({
        model: "gpt-4o-mini-tts", 
        voice: "coral",
        input: "Today is a wonderful day to build something people love! Like a language learning web app",
        instructions: "Speak in a cheerful and positive tone.",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    console.log('Waiting to write file');
    await fs.promises.writeFile(speechFile, buffer);
    console.log('Done writing file');
    
}   catch (error) {
    console.log('Error generating speech: ', error);
}
}