
import OpenAI from 'openai';
const client = new OpenAI();

export class OpenAIService {
    private secretKey : string;

    constructor(secretKey: string){
        if(!secretKey){
            throw new Error('OpenAI Secret Key is required!');
        }
        this.secretKey = secretKey;
    }

    public async generateTextResponse(prompt:string) : Promise<string> {
        const response = await client.responses.create({
            model: "gpt-5.2",
            input: "Write a one-sentence action story about Kai Cenat playing pickleball."
        });
        return response.output_text;
    }
}}