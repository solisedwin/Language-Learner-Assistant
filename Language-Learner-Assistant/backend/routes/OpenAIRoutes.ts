import { Router, Request, Response } from 'express'
import {OpenAIService} from '../services/OpenAIService';

const router = Router();
const secretKey = process.env.OPENAI_SECRET_KEY || '';
const openAIService = new OpenAIService(secretKey);

router.post('/', (req:Request, res: Response) => {
    
});

export default router;