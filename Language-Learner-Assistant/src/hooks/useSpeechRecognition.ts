import { useEffect, useState, useRef} from "react";

export function useSpeechRecongnition () {
    const [isRecordingSpeech, setIsRecordingSpeech] = useState(false);
    const [speechTranscript, setSpeechTranscript] = useState('');
    const SpeechRecognitionConstructor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const speechRecognitionRef = useRef<InstanceType<typeof SpeechRecognitionConstructor> | null>(null);

    useEffect(()=> {
        setUpSpeechRecognition();
    }, []);

    const setUpSpeechRecognition = () => {
        // Use the Web Speech API (prefixed for Chrome/Safari)
        const SpeechRecognitionConstructor = window.SpeechRecognition ??  window.webkitSpeechRecognition; // TODO: Return error if undefined (Browser doesnt supoort it)
        if (!SpeechRecognitionConstructor) return;
        
        speechRecognitionRef.current = new SpeechRecognitionConstructor();
        
        speechRecognitionRef.current.lang = "de-DE"; // German language
        speechRecognitionRef.current.interimResults = false;     
        speechRecognitionRef.current.maxAlternatives = 1;       

        speechRecognitionRef.current.onresult = (event:SpeechRecognitionEvent) => {
            const transcript = event.results[0][0]?.transcript;
            console.log('Transcript: ', transcript);
            setSpeechTranscript(transcript);
        };

        speechRecognitionRef.current.onend = () => {
            console.log("Recognition ended.");
        };

        speechRecognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Recognition error:", event.error);
        };
    };

    const speechRecognitionStart = () => {
        if (!speechRecognitionRef.current) return;
        setIsRecordingSpeech(true);
        speechRecognitionRef.current?.start();
    }

    const speechRecognitionEnd = () => {
        setIsRecordingSpeech(false);
        speechRecognitionRef.current?.stop();
    }

    return {
        isRecordingSpeech,
        speechTranscript,
        speechRecognitionStart,
        speechRecognitionEnd
    }

}

 