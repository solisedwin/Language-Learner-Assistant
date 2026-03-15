declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
  interface SpeechRecognitionEvent {
    readonly results: SpeechRecognitionResultList;
    readonly resultIndex: number;
  }
  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message?: string;
  }
}

export {};
