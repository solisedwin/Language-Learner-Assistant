import { DeepL } from "../clients/DeepL";

export class TranslationService {
  private deeplClient: DeepL;
  constructor() {
    this.deeplClient = new DeepL();
    if (!this.deeplClient) {
      throw new Error("DeepL Object instance not set !");
    }
  }

  public async translateToEnglish(germanText: string): Promise<string> {
    const translateText = await this.deeplClient.translateToEnglish(germanText);
    return translateText;
  }
}
