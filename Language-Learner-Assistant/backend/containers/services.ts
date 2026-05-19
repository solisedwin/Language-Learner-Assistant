import { OpenAIClient } from "../clients/OpenAI.ts";
import { AmazonS3 } from "clients/AmazonS3.ts";
import { AudioService } from "../services/AudioService";
import { ConversationService } from "../services/ConversationsService";
import { GrammarService } from "../services/GrammarService";

import { TranslationService } from "../services/TranslationService";
import { DeepL } from "../clients/DeepL";

const amazonS3 = new AmazonS3();
const deepL = new DeepL();
const openAI = new OpenAIClient();

export const audioService = new AudioService(openAI);
export const conversationService = new ConversationService(openAI, amazonS3);
export const translationService = new TranslationService(deepL);
export const grammarService = new GrammarService(openAI);
