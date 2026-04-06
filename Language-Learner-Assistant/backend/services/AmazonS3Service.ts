import { AmazonS3Client } from "../clients/AmazonS3";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

export class AmazonS3Service {
  private amazonS3: S3Client;

  constructor() {
    const amazonS3Client = new AmazonS3Client();
    const amazonS3Instance = amazonS3Client.getAmazonS3Instance();
    this.amazonS3 = amazonS3Instance;
  }

  public async saveGermanAudio(buffer: Buffer<ArrayBuffer>) {
    const fileName = this.generateRandomFileName();
    const folder = "audio";
    const key = `${folder}/${fileName}`;

    const putParams = {
      Bucket: process.env.AWS_S3_BUCKETNAME,
      Key: key,
      Body: buffer,
      ContentType: "audio/wav",
    };
    const putCommand = new PutObjectCommand(putParams);
    await this.amazonS3.send(putCommand);
  }

  private generateRandomFileName(): string {
    const randomId = crypto.randomBytes(32).toString("hex");
    return randomId;
  }
}
