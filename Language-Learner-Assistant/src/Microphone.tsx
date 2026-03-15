import Button from "@mui/material/Button";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import StopIcon from "@mui/icons-material/Stop";
import { useSpeechRecongnition } from "./hooks/useSpeechRecognition";
import { useEffect } from "react";

import { continueConversation } from "./api/features/Conversation/Conversation";
import type { AIConversationResponse } from "@shared/types/Conversation.ts";

type MicrophoneProps = {
  onConversationReply: (conversationReply: AIConversationResponse) => void;
};

function Microphone({ onConversationReply }: MicrophoneProps) {
  const {
    isRecordingSpeech,
    speechTranscript,
    speechRecognitionStart,
    speechRecognitionEnd,
  } = useSpeechRecongnition();

  useEffect(() => {
    if (!isRecordingSpeech && speechTranscript !== "") {
      console.log("~~ Transcript: ", speechTranscript);

      const continueAIConvo = async () => {
        const {
          germanText,
          englishTranslation,
          audioURLSrc,
        }: AIConversationResponse =
          await continueConversation(speechTranscript);
        onConversationReply({
          germanText: germanText,
          englishTranslation: englishTranslation,
          audioURLSrc: audioURLSrc,
        });
      };
      continueAIConvo();
    }
  }, [isRecordingSpeech]);

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={
          isRecordingSpeech ? <StopIcon /> : <RadioButtonCheckedIcon />
        }
        onClick={
          !isRecordingSpeech ? speechRecognitionStart : speechRecognitionEnd
        }
      >
        {isRecordingSpeech ? "Stop" : "Record"}
      </Button>
    </div>
  );
}
export default Microphone;
