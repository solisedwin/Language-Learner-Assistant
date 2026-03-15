import { OpenAIClient } from "../clients/OpenAI.ts";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import Scenario from "./../scenarios/Scenario.ts";
import { ScenarioFactory } from "../scenarios/ScenarioFactory.ts";
import TrainStation from "scenarios/TrainStation.ts";

export class ConversationsService {
  private openAIClient: OpenAIClient;
  private currentScenario: Scenario;
  constructor() {
    this.openAIClient = new OpenAIClient();
    this.currentScenario = new TrainStation(); //Default Scenario
    if (!this.openAIClient) {
      throw new Error("OpenAI Object instance is not set");
    }
  }

  public async startConversation(roleplayScenario: RoleplayScenario) {
    const scenarioFactory = new ScenarioFactory();
    const scenario: Scenario = scenarioFactory.getScenario(roleplayScenario);
    this.currentScenario = scenario;
    const startConversationPrompt = scenario.START_CONVERSATION;
    const responseText = await this.openAIClient.generateTextResponse(
      startConversationPrompt,
    );
    return responseText;
  }

  public async continueConversation(germanText: string) {
    const continueConversationPrompt =
      this.currentScenario.CONTINUE_CONVERSATION;
    const responseText = await this.openAIClient.continueConversation(
      continueConversationPrompt,
      germanText,
    );
    console.log("Continue conversation text: ", responseText);
    return responseText;
  }
}
