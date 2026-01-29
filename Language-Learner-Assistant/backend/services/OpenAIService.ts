import OpenAI from 'openai';

const secretKey = process.env.OPENAI_SECRET_KEY || '';
 export const openAI = new OpenAI({
    apiKey: secretKey
 });


