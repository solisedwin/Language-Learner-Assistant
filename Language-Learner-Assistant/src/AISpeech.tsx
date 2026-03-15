import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import type { AudioSpeechURL } from "@shared/types/Conversation.ts";

function AISpeech({ audioURLSrc }: AudioSpeechURL) {
  const AIAudioSpeechRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    AIAudioSpeechRef.current?.play();
  }, [audioURLSrc]);

  return (
    <>
      {audioURLSrc && (
        <audio ref={AIAudioSpeechRef} src={audioURLSrc} controls />
      )}

      <Button onClick={() => AIAudioSpeechRef.current?.play()}>
        Play AI Audio Response
      </Button>
    </>
  );
}
export default AISpeech;
