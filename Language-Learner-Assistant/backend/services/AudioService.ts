import { AmazonS3 } from "../clients/AmazonS3";
import { OpenAIClient } from "../clients/OpenAI";
import crypto from "crypto";
import dayjs from "dayjs";

type AudioConfig = {
  audioBuffer: Buffer;
  expiresIn: string;
};
type AudioCache = Record<crypto.UUID, AudioConfig>;

export class AudioService {
  private amazonS3: AmazonS3;
  private openAIClient: OpenAIClient;
  private audioCache: AudioCache = {};

  constructor(amazonS3: AmazonS3, openAIClient: OpenAIClient) {
    if (!amazonS3) {
      throw new Error("Amazons3 Object instance is not set");
    }
    if (!openAIClient) {
      throw new Error("OpenAI Object instance is not set");
    }
    this.amazonS3 = amazonS3;
    this.openAIClient = openAIClient;
  }

  public async textToSpeech(text: string): Promise<Buffer> {
    const audioSpeechResponse = await this.openAIClient.textToSpeech(text);
    return audioSpeechResponse;
  }

  public cacheAudioSpeech(audioSpeech: Buffer): crypto.UUID {
    const tempAudioUUID = crypto.randomUUID();

    // Set expiration date 5 minutes from now
    const fiveMinutesFromNow = dayjs().utc().add(5, "minute").format();

    this.audioCache[tempAudioUUID] = {
      audioBuffer: audioSpeech,
      expiresIn: fiveMinutesFromNow,
    };
    return tempAudioUUID;
  }

  public async getCachedAudioSpeech(audioID: crypto.UUID): Promise<Buffer> {
    if (!(audioID in this.audioCache)) {
      throw new Error("Audio ID does not exist");
    }
    const expiresIn = this.audioCache[audioID].expiresIn;
    const expirationDateTime = dayjs(expiresIn).utc();

    const currentUTCNow = dayjs().utc();
    const isBeforeExpirationDate = dayjs(currentUTCNow).isSameOrBefore(expirationDateTime);

    if (!isBeforeExpirationDate) {
      delete this.audioCache[audioID];
      throw new Error("Cached audio is past expiration date");
    }
    const cachedAudioBuffer = this.audioCache[audioID].audioBuffer;

    // delete this.audioCache[audioID]; // Remove Audio Buffer from cache
    return cachedAudioBuffer;
  }

  public async getPreSignedUrl() {
    let url = null;
    try {
      url = await this.amazonS3.getPreSignedUrl();
    } catch (error) {
      console.error("Error on retrieved presigned url. Error: ", error);
    }
    return url;
  }
}
