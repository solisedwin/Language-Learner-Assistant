import type { Request, Response } from 'express';
import { openAI } from '../services/OpenAIService.ts';
import {textToAudio} from '../services/AudioService.ts'
import type {RoleplayScenario}  from '../scenarios/types.ts';
import Scenario from './../scenarios/Scenario.ts'
import { ScenarioFactory } from '../scenarios/ScenarioFactory.ts';

export const converse = async (req: Request, res: Response) => {
     const roleplayScenario : RoleplayScenario = req.body.scenario;
     const scenarioFactory = new ScenarioFactory();
     const scenario: Scenario = scenarioFactory.getScenario(roleplayScenario);
     const startConversation = scenario.START_CONVERSATION;

     const response = await openAI.responses.create({
            model: 'gpt-4o-mini',
            input: [{
                role: 'system',
                content: startConversation
            }]
        });

    console.log('Response output text: ', response.output_text);
    const textResponse = response.output_text;
    const audioBuffer = await textToAudio(textResponse);
     
     res.set({
        "Content-Type": "audio/wav",
        "Content-Length": audioBuffer.length
    });

    res.send(audioBuffer);
};


