
import OpenAI from 'openai';

export class OpenAIService {
    private client: OpenAI;
   
    constructor(secretKey: string){
        if(!secretKey){
            throw new Error('OpenAI Secret Key is required!');
        }
        this.client = new OpenAI({ apiKey: secretKey });
    }

    public async generateTextResponse(prompt:string) : Promise<string> {
        const response = await this.client.responses.create({
            model: "gpt-5.2",
            input: "Write a one-sentence action story about Kai Cenat playing pickleball."
        });
        return response.output_text;
    }
}