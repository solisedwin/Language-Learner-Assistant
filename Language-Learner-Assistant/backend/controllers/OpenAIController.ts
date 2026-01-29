import type { Request, Response } from 'express';
import { openAI } from '../services/OpenAIService.ts';

export const generateTextResponse = async (req: Request, res: Response) => {
     const response = await openAI.responses.create({
            model: "gpt-4o-mini",
            input: "Write a one-sentence action story about Kai Cenat playing pickleball in Iceland.",
        });
    console.log('Response output text: ', response.output_text);
    res.send(response.output_text);
};
