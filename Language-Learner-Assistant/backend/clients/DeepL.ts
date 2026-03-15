import * as deepl from "deepl-node";

export class DeepL {
  private deeplClient: deepl.DeepLClient;
  private sourceLang: deepl.SourceLanguageCode = "de"; // Deutsch/German
  private targetLang: deepl.TargetLanguageCode = "en-US"; // English

  constructor() {
    const apiKey = process.env.DEEPL_SECRET_KEY || "";
    if (!apiKey) {
      throw new Error("Invalid DEEPL API Key");
    }
    this.deeplClient = new deepl.DeepLClient(apiKey);
  }

  public async translateToEnglish(germanText: string): Promise<string> {
    const translatedText = await this.deeplClient
      .translateText(germanText, this.sourceLang, this.targetLang)
      .then((data) => data.text);

    return translatedText;
  }
}
