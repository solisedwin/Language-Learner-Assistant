import { useEffect, useRef } from "react";
import type { AudioSpeechURL } from "@shared/types/Conversation.ts";

type AISpeechProps = {
  audioURLSrc: AudioSpeechURL;
  isRolePlayInProgress: boolean;
};

function AISpeech({ audioURLSrc, isRolePlayInProgress }: AISpeechProps) {
  const AIAudioSpeechRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    AIAudioSpeechRef.current?.play();
  }, [audioURLSrc]);

  useEffect(() => {
    if (!isRolePlayInProgress) {
      AIAudioSpeechRef.current?.pause();
    }
  }, [isRolePlayInProgress]);

  return (
    <>
      {audioURLSrc && (
        <audio ref={AIAudioSpeechRef} src={audioURLSrc} controls />
      )}
    </>
  );
}
export default AISpeech;
