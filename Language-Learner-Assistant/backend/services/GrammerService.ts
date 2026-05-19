import { OpenAIClient } from "../clients/OpenAI.ts";

export class GrammarService {
  private openAIClient: OpenAIClient;

  constructor(openAIClient: OpenAIClient) {
    if (!openAIClient) {
      throw new Error("Open AI Client is not set");
    }
    this.openAIClient = openAIClient;
  }
  /*
  private async grammarCorrection(speechTranscript: string) {
    const corrections = this.openAIClient.grammarFeedback(speechTranscript);
    return corrections;
  }

  private async scoreUserResponse(speechTranscript: string) {
    const score = this.openAIClient.scoreUserResponse(speechTranscript);
    return score;
  }

  public async generateFeedback(speechTranscript: string) {
    const corrections = this.grammarCorrection(speechTranscript);
    const score = this.scoreUserResponse(speechTranscript);
    return {
      corrections: corrections,
      score: score,
    };
  }
    */
}
