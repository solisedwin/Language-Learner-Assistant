import { OpenAIClient } from "../clients/OpenAI";
import crypto from "crypto";
import dayjs from "dayjs";

type AudioConfig = {
  audioBuffer: Buffer;
  expiresIn: string;
};
type AudioCache = Record<crypto.UUID, AudioConfig>;

export class AudioService {
  private openAIClient: OpenAIClient;
  private audioCache: AudioCache = {};

  constructor() {
    this.openAIClient = new OpenAIClient();
    if (!this.openAIClient) {
      throw new Error("OpenAI Object instance is not set");
    }
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
}
