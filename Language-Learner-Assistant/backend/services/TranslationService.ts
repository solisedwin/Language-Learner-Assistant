import { DeepL } from "../clients/DeepL";

export class TranslationService {
  private deeplClient: DeepL;
  constructor() {
    this.deeplClient = new DeepL();
    if (!this.deeplClient) {
      throw new Error("DeepL Object instance not set !");
    }
  }

  public async translateToEnglish(languageText: string): Promise<string> {
    const translatedText = await this.deeplClient.translateToEnglish(languageText);
    return translatedText;
  }
}
