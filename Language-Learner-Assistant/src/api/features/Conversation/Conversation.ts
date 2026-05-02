import { request } from "./../../AxiosUtil.ts";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import type { AIAudioURL, ConversationExchange } from "@shared/types/Conversation.ts";

export const startConversation = async (
  scenario: RoleplayScenario,
): Promise<ConversationExchange> => {
  const response = await request<ConversationExchange>({
    method: "POST",
    url: "/converse",
    data: {
      scenario: scenario,
    },
  });
  return response;
};

export const continueConversation = async (
  speechTranscript: string,
): Promise<ConversationExchange> => {
  const response = await request<ConversationExchange>({
    method: "POST",
    url: "/converse/continue-conversation",
    data: {
      speechTranscript: speechTranscript,
    },
  });
  return response;
};

export const getGermanAudio = async (audioID: string): Promise<ArrayBuffer> => {
  const response = await request<ArrayBuffer>({
    method: "GET",
    url: `/converse/audiospeech/${audioID}`,
    responseType: "arraybuffer",
  });
  return response;
};

export const audioUploadPermissions = async (): Promise<string | null> => {
  const response = await request<string | null>({
    method: "POST",
    url: "converse/audioUploadPermissions",
  });
  return response;
};
