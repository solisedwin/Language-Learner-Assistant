import { DeepL } from "../clients/DeepL";

export class TranslationService {
  private deeplClient: DeepL;
  constructor(deeplClient: DeepL) {
    if (!deeplClient) {
      throw new Error("DeepL Object instance not set !");
    }
    this.deeplClient = deeplClient;
  }

  public async translateToEnglish(languageText: string): Promise<string> {
    const translatedText = await this.deeplClient.translateToEnglish(languageText);
    return translatedText;
  }
}
