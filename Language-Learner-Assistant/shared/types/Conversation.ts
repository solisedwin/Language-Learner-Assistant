export type AIAudioURL = `api/converse/audiospeech/${string}`;

export type LanguageTexts = {
  text: string;
  englishTranslation: string;
};
export type ConversationExchange = LanguageTexts & {
  audioURLSrc: AIAudioURL;
};
