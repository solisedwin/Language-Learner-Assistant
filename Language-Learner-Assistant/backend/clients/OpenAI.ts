import OpenAI from "openai";
import { PromptResponse } from "./../types/AIPrompt";

export class OpenAIClient {
  private openAI: OpenAI;
  constructor() {
    const secretKey = process.env.OPENAI_SECRET_KEY || "";
    if (!secretKey) {
      throw new Error("Invalid OpenAI API Key");
    }
    this.openAI = new OpenAI({
      apiKey: secretKey,
    });
  }

  public async initialStartPrompt(prompt: string): Promise<PromptResponse> {
    const response = await this.openAI.responses.create({
      model: process.env.OPENAI_CONVERSATION_MODEL,
      input: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });
    return {
      id: response.id,
      outputText: response.output_text,
    };
  }

  public async createPrompt(
    continuedPrompt: string,
    conversationID: string,
  ): Promise<PromptResponse> {
    if (!conversationID) {
      throw Error("Previous repsonse ID is required");
    }
    const response = await this.openAI.responses.create({
      model: process.env.OPENAI_CONVERSATION_MODEL,
      previous_response_id: conversationID,
      ...(continuedPrompt
        ? [
            {
              role: "user",
              content: continuedPrompt,
            },
          ]
        : []),
    });
    return {
      id: response.id,
      outputText: response.output_text,
    };
  }

  public async textToSpeech(text: string): Promise<Buffer<ArrayBuffer>> {
    console.log("--- Making speech request to OpenAI ---");
    console.log("Text we will convert to audio: ", text);
    try {
      const audioResponse = await this.openAI.audio.speech.create({
        model: process.env.OPENAI_AUDIO_MODEL as string,
        voice: "coral",
        input: text,
        instructions: "Speak in a cheerful and positive tone.",
      });
      const buffer = Buffer.from(await audioResponse.arrayBuffer());
      return buffer;
    } catch (error) {
      throw new Error("Failed to generate audio");
    }
  }

  /*
      public async grammarFeedback(grammarAIPrompt: string, text: string): Promise<string> {
        const response = await this.openAI.responses.create({
          model: process.env.OPENAI_CONVERSATION_MODEL,
          previous_response_id: this.currentResponseID,
          input: [
            {
              role: "system",
              content: grammarAIPrompt,
            },
            {
              role: "user",
              content: text,
            },
          ],
        });
        this.currentResponseID = response.id;
        return response.output_text;



    public async generateTextResponse(text: string): Promise<string> {
    const response = await this.openAI.responses.create({
      model: process.env.OPENAI_CONVERSATION_MODEL,
      previous_response_id: this.currentResponseID,
      input: [
        {
          role: "system",
          content: text,
        },
      ],
    });
    this.currentResponseID = response.id;
    return response.output_text;
  }

  }
  */
}
