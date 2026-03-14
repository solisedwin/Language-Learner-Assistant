import OpenAI from 'openai';

export class OpenAIClient {
    
    private openAI: OpenAI
    private currentResponseID : string | null = null;
    constructor() {
        const secretKey = process.env.OPENAI_SECRET_KEY || '';
        if(!(secretKey)){
            throw new Error('Invalid OpenAI API Key');
        }
        this.openAI = new OpenAI({
            apiKey: secretKey
        });
    }

   public async generateTextResponse(text:string) : Promise<string> {
      const response = await this.openAI.responses.create({
                  model: 'gpt-4o-mini',
                  previous_response_id : this.currentResponseID,
                  input: [{
                      role: 'system',
                      content: text,
                  }]
              });
        this.currentResponseID = response.id;
      return response.output_text;
   }

   public async continueConversation(continueConversationPrompt:string, germanText:string) : Promise<string> {
    const response = await this.openAI.responses.create({
                  model: 'gpt-4o-mini',
                  previous_response_id : this.currentResponseID,
                  input: [
                    {
                      role: 'system',
                      content: continueConversationPrompt,
                    },
                    {
                      role: 'user',
                      content: germanText,
                    },
                ]
              });
        this.currentResponseID = response.id;
    return response.output_text;
   }

   public async textToSpeech(text:string) : Promise<Buffer<ArrayBuffer>> {
       console.log('--- Making speech request to OpenAI ---');
       console.log('Text we will convert to audio: ', text);
       try {
           const audioResponse = await this.openAI.audio.speech.create({
               model: "gpt-4o-mini-tts", 
               voice: "coral",
               input: text,
               instructions: "Speak in a cheerful and positive tone.",
       });
       const buffer = Buffer.from(await audioResponse.arrayBuffer());
       return buffer;
   }   catch (error) {
       throw new Error('Failed to generate audio');
   }
   }
 }


