import { request } from "./../../AxiosUtil.ts";
import type { RoleplayScenario } from "@shared/types/RoleplayScenario";
import type { ConversationResponse } from "./types.ts";

export const startConversation = async (
  scenario: RoleplayScenario,
): Promise<ConversationResponse> => {
  const response = await request<ConversationResponse>({
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
): Promise<ConversationResponse> => {
  const response = await request<ConversationResponse>({
    method: "POST",
    url: "/converse/continue-conversation",
    data: {
      speechTranscript: speechTranscript,
    },
  });
  return response;
};
