export type AIAudioURL = `api/converse/audiospeech/${string}`;

export type LanguageTexts = {
  languageText: string;
  englishTranslation: string;
};
export type ConversationExchange = LanguageTexts & {
  audioURLSrc: AIAudioURL;
};
