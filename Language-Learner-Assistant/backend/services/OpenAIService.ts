
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
        return 'Kai Cenat froze mid-rally on an icy Iceland pickleball court when a seal wandered by and stared him down so intensely.';
        /*
        const response = await this.client.responses.create({
            model: "gpt-4.1-mini",
            input: "Write a one-sentence action story about Kai Cenat playing pickleball in Iceland.",
        });
        return response.output_text;
        */
    }
}