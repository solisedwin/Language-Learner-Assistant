import { OpenAIClient } from "../clients/OpenAI.ts";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import type { ConversationExchange } from "@shared/types/Conversation";
import Scenario from "./../scenarios/Scenario.ts";
import { ScenarioFactory } from "../scenarios/ScenarioFactory.ts";
import { PromptResponse } from "./../types/AIPrompt.ts";

export class ConversationService {
  private openAIClient: OpenAIClient;
  private scenarioFactory: ScenarioFactory;
  constructor(openAIClient: OpenAIClient) {
    if (!openAIClient) {
      throw new Error("OpenAI Object instance is not set");
    }
    this.openAIClient = openAIClient;
    this.scenarioFactory = new ScenarioFactory();
  }

  public async startConversation(roleplayScenario: RoleplayScenario) {
    const scenario: Scenario = this.scenarioFactory.getScenario("TrainStation");
    const startConversationPrompt = scenario.START_CONVERSATION;
    const promptResponse = await this.openAIClient.initialStartPrompt(startConversationPrompt);
    const responseText = promptResponse.outputText;
    return responseText;
  }

  public async continueConversation(userResponse: string): Promise<PromptResponse> {
    // Test temp code . Need to store Scenario state in Redis or DB
    // Hard coded to Trainstation
    const scenario: Scenario = this.scenarioFactory.getScenario("TrainStation");

    const continueConversationPrompt = scenario.CONTINUE_CONVERSATION;
    const response = this.openAIClient.createPrompt(continueConversationPrompt, userResponse);
    return response;
  }
}
