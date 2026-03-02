
import { OpenAIClient } from '../clients/OpenAI.ts';
import type { RoleplayScenario } from '@shared/types/RoleplayScenario';
import Scenario from './../scenarios/Scenario.ts';
import { ScenarioFactory } from '../scenarios/ScenarioFactory.ts';

export class ConversationsService {
    private openAIClient : OpenAIClient
    constructor(){
        this.openAIClient = new OpenAIClient();
        if(!this.openAIClient){
            throw new Error('OpenAI Object instance is not set');
        }
    }

    public async startConversation(roleplayScenario: RoleplayScenario) {
        const scenarioFactory = new ScenarioFactory();
        const scenario: Scenario = scenarioFactory.getScenario(roleplayScenario);
        const startConversation = scenario.START_CONVERSATION;
        const responseText = await this.openAIClient.generateTextResponse(startConversation);
        return responseText;
    }
}

