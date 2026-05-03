import LoadingIndicator from "./LoadingIndicator.tsx";
import { useLoading } from "./hooks/useLoading.ts";
import Button from "@mui/material/Button";
import { useState } from "react";
import type { RoleplayScenario } from "./../shared/types/RoleplayScenario";
import {
  audioUploadPermissions,
  getAudio,
  startConversation,
} from "./api/features/Conversation/Conversation";
import RolePlayOptionButtons from "./RolePlayOptionButtons.tsx";
import Microphone from "./Microphone.tsx";
import Translation from "./Translation.tsx";
import type { AIAudioURL, ConversationExchange } from "@shared/types/Conversation.ts";
import AISpeech from "./AISpeech.tsx";
import SaveTranslationButton from "./SaveTranslationButton.tsx";

function ScenarioSelector() {
  const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>("Supermarket");
  const [isShowingRoleplayOptionButtons, setIsShowingRoleplayOptionButtons] = useState(true);
  const [conversationReply, setConversationReply] = useState<ConversationExchange | null>(null);

  const [preSignedUrl, setPreSignedUrl] = useState<string | null>(null);

  const [isRolePlayInProgress, setIsRolePlayInProgress] = useState(false);

  const startRolePlay = async () => {
    setIsShowingRoleplayOptionButtons(false);
    startRequest();
    try {
      const { languageText, englishTranslation, audioURLSrc }: ConversationExchange =
        await startConversation(roleplayScenario);

      setIsRolePlayInProgress(true);
      setConversationReply({
        languageText: languageText,
        englishTranslation: englishTranslation,
        audioURLSrc: audioURLSrc,
      });
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      stopRequest();
    }
  };

  //TODO: Move this function to a shared/utility folder for Audio service
  const parseAudioID = async (audioUrlSrc: AIAudioURL) => {
    const id = audioUrlSrc.substring(audioUrlSrc.lastIndexOf("/") + 1);
    return id;
  };

  const saveAudio = async () => {
    try {
      let url = preSignedUrl;
      if (!preSignedUrl) {
        url = await audioUploadPermissions();
        setPreSignedUrl(url);
      }
      const audioId = await parseAudioID(conversationReply?.audioURLSrc);
      const audio = await getAudio(audioId);
      console.log("-- Pre Signed url we are about to use: ", url);
      if (url) {
        await fetch(url, {
          method: "PUT",
          body: audio,
          headers: {
            "Content-Type": "audio/wav",
          },
        });
      }
    } catch (error) {
      console.error("Error on saving audio. ", error);
    }
  };

  const stopRolePlay = () => {
    setIsRolePlayInProgress(false);
    setConversationReply(null);
    setIsShowingRoleplayOptionButtons(true);
  };

  const { isLoading, startRequest, stopRequest } = useLoading();

  return (
    <div>
      Current Roleplay scenario: {roleplayScenario}
      {isShowingRoleplayOptionButtons ? (
        <>
          <RolePlayOptionButtons onRolePlaySelection={setRoleplayScenario} />
          <Button variant="contained" color="success" onClick={startRolePlay}>
            Start Roleplay
          </Button>
        </>
      ) : (
        <>
          <Button onClick={stopRolePlay}>Stop Roleplay</Button>
        </>
      )}
      {isLoading && <LoadingIndicator />}
      {isRolePlayInProgress && conversationReply && (
        <>
          <AISpeech
            audioURLSrc={conversationReply.audioURLSrc}
            isRolePlayInProgress={isRolePlayInProgress}
          />
          <Microphone
            onConversationReply={setConversationReply}
            isRolePlayInProgress={isRolePlayInProgress}
          />

          <SaveTranslationButton onSave={saveAudio} />
          <Translation
            languageText={conversationReply.languageText}
            englishTranslation={conversationReply.englishTranslation}
          />
        </>
      )}
    </div>
  );
}

export default ScenarioSelector;
