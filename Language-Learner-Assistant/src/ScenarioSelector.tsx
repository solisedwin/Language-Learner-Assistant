import LoadingIndicator from "./LoadingIndicator.tsx";
import { useLoading } from "./hooks/useLoading.ts";
import Button from "@mui/material/Button";
import { useState } from "react";
import type { RoleplayScenario } from "./../shared/types/RoleplayScenario.ts";
import { startConversation } from "./api/features/Conversation/Conversation.ts";
import RolePlayOptionButtons from "./RolePlayOptionButtons.tsx";
import Microphone from "./Microphone.tsx";
import Translation from "./Translation.tsx";
import type { AIConversationResponse } from "@shared/types/Conversation.ts";
import AISpeech from "./AISpeech.tsx";

function ScenarioSelector() {
  const [roleplayScenario, setRoleplayScenario] =
    useState<RoleplayScenario>("Supermarket");
  const [isShowingRoleplayOptionButtons, setIsShowingRoleplayOptionButtons] =
    useState(true);
  const [conversationReply, setConversationReply] =
    useState<AIConversationResponse | null>(null);

  const startRolePlay = async () => {
    setIsShowingRoleplayOptionButtons(false);
    startRequest();
    try {
      const {
        germanText,
        englishTranslation,
        audioURLSrc,
      }: AIConversationResponse = await startConversation(roleplayScenario);

      setConversationReply({
        germanText: germanText,
        englishTranslation: englishTranslation,
        audioURLSrc: audioURLSrc,
      });
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      stopRequest();
    }
  };

  const { isLoading, startRequest, stopRequest } = useLoading();

  return (
    <div>
      Current Roleplay scenario: {roleplayScenario}
      {isShowingRoleplayOptionButtons && (
        <>
          <RolePlayOptionButtons onRolePlaySelection={setRoleplayScenario} />
          <Button variant="contained" color="success" onClick={startRolePlay}>
            Start Roleplay
          </Button>
        </>
      )}
      {isLoading && <LoadingIndicator />}
      {conversationReply && (
        <>
          <AISpeech audioURLSrc={conversationReply.audioURLSrc} />
          <Microphone onConversationReply={setConversationReply} />
          <Translation
            germanText={conversationReply.germanText}
            englishTranslation={conversationReply.englishTranslation}
          />
        </>
      )}
    </div>
  );
}

export default ScenarioSelector;
