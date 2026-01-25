import type { Request, Response } from 'express';
import { OpenAIService } from '../services/OpenAIService.ts';


export const generateTextResponse = (req: Request, res: Response) => {
    const secretKey = process.env.OPENAI_SECRET_KEY || '';
    const openAIService = new OpenAIService(secretKey);

    openAIService.generateTextResponse('Story about Kai Cenat playing pickleball in Iceland')
    .then(responseText => {
        res.json({ text: responseText });
    });
};
