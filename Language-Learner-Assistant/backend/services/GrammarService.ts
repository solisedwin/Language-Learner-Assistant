import { OpenAIClient } from "../clients/OpenAI.ts";

export class GrammarService {
  private openAIClient: OpenAIClient;

  constructor(openAIClient: OpenAIClient) {
    this.openAIClient = openAIClient;
  }

  private async grammarCorrection(speechTranscript: string) {
    const corrections = this.openAIClient.grammarFeedback(speechTranscript);
    return corrections;
  }

  private async scoreUserResponse(speechTranscript: string) {
    const score = this.openAIClient.scoreUserResponse(speechTranscript);
    return score;
  }

  public async feedbackHelp(speechTranscript: string) {
    const corrections = this.grammarCorrection(speechTranscript);
    const score = this.scoreUserResponse(speechTranscript);
    return {
      corrections: corrections,
      score: score,
    };
  }
}
