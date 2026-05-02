export type AIAudioURL = `api/converse/audiospeech/${string}`;

export type LanguageTexts = {
  germanText: string;
  englishTranslation: string;
};
export type ConversationExchange = LanguageTexts & {
  audioURLSrc: AIAudioURL;
};
