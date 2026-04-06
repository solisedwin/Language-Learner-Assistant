import { S3Client } from "@aws-sdk/client-s3";

export class AmazonS3Client {
  private AmazonS3: S3Client;

  constructor() {
    const accessKey = process.env.AWS_S3_ACCESS_KEY;
    const secretKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
    const region = process.env.AWS_S3_REGION;

    if (!accessKey || !secretKey) {
      throw new Error("Keys are invalid for the Amazon S3 Service");
    }

    this.AmazonS3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      region: region,
    });
  }

  public getAmazonS3Instance(): S3Client {
    if (!this.AmazonS3) {
      throw new Error("Amazon S3 Instance is not configured");
    }
    return this.AmazonS3;
  }
}
