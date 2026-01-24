import type { Request, Response } from 'express';

/*
    const secretKey = process.env.OPENAI_SECRET_KEY || '';
    const openAIService = new OpenAIService(secretKey);
*/
export const generateTextResponse = (req: Request, res: Response) => {
    res.send('Get OpenAI Response');
};
