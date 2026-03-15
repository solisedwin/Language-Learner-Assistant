export type AIAudioURL = `api/converse/audiospeech/${string}`;

export type LanguageTexts = {
    germanText: string,
    englishTranslation: string
}
export type AIConversationResponse = LanguageTexts & {
    audioURLSrc: AIAudioURL
} 
