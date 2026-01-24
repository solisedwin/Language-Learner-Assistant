import type { Request, Response } from 'express';
import { OpenAIService } from '../services/OpenAIService.ts';


    const secretKey = process.env.OPENAI_SECRET_KEY || '';
    console.log(process.env);
    const openAIService = new OpenAIService(secretKey);

export const generateTextResponse = (req: Request, res: Response) => {
    res.send('Get OpenAI Response');
    /*
    openAIService.generateTextResponse('')
    .then(responseText => {
        res.json({ text: responseText });
        
    });
    */
};
