import { OpenAIClient } from "../clients/OpenAI.ts";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import type { ConversationExchange } from "@shared/types/Conversation";
import { AmazonS3 } from "clients/AmazonS3.ts";
import Scenario from "./../scenarios/Scenario.ts";
import { ScenarioFactory } from "../scenarios/ScenarioFactory.ts";
import TrainStation from "scenarios/TrainStation.ts";

export class ConversationsService {
  private openAIClient: OpenAIClient;
  private currentScenario: Scenario;
  private amazonS3: AmazonS3;
  constructor() {
    this.openAIClient = new OpenAIClient();
    this.currentScenario = new TrainStation(); //Default Scenario
    this.amazonS3 = new AmazonS3();
    if (!this.openAIClient) {
      throw new Error("OpenAI Object instance is not set");
    }
  }

  public async startConversation(roleplayScenario: RoleplayScenario) {
    const scenarioFactory = new ScenarioFactory();
    const scenario: Scenario = scenarioFactory.getScenario(roleplayScenario);
    this.currentScenario = scenario;
    const startConversationPrompt = scenario.START_CONVERSATION;
    const responseText = await this.openAIClient.generateTextResponse(startConversationPrompt);
    return responseText;
  }

  public async continueConversation(transcript: string) {
    const continueConversationPrompt = this.currentScenario.CONTINUE_CONVERSATION;
    const responseText = await this.openAIClient.continueConversation(
      continueConversationPrompt,
      transcript,
    );
    console.log("Continue conversation text: ", responseText);
    return responseText;
  }

  public async getPreSignedUrl() {
    let url = null;
    try {
      url = await this.amazonS3.getPreSignedUrl();
    } catch (error) {
      console.error("Error on retrieved presigned url. Error: ", error);
    }
    return url;
  }
}
