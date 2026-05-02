import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

export class AmazonS3 {
  private s3: S3Client;

  constructor() {
    const accessKey = process.env.AWS_S3_ACCESS_KEY;
    const secretKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
    const region = process.env.AWS_S3_REGION;

    if (!accessKey || !secretKey) {
      throw new Error("Keys are invalid for the Amazon S3 Service");
    }

    this.s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      region: region,
    });
  }

  public async getPreSignedUrl() {
    const folder = "audio";
    const fileName = this.generateRandomFileName();
    const key = `${folder}/${fileName}`;

    const params = {
      Bucket: "language-learner-assistant",
      Key: key,
      ContentType: "audio/wav",
    };

    const putCommand = new PutObjectCommand(params);

    const presignedUrl = await getSignedUrl(this.s3, putCommand, {
      expiresIn: 300, // 5 Minutes
    });
    return presignedUrl;
  }

  private generateRandomFileName(): string {
    const randomId = crypto.randomBytes(32).toString("hex");
    return randomId;
  }
}
