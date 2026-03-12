
export type AudioSpeechURL = `api/converse/audiospeech/${string}`;

export type AIConversationResponse = {
    germanText: string,
    englishTranslation: string,
    audioURLSrc: AudioSpeechURL
} 
