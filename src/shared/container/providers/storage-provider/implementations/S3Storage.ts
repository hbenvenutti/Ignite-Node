import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

import upload from '@config/files/upload';
import AppError from '@errors/AppError';

import IStorageProvider from '../IStorageProvider';

class S3Storage implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: 'sa-east-1'
    });
  }

  async save(filename: string, directory: string): Promise<string> {
    const originalName = path.resolve(upload.tmpDir, filename);

    const file = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    if (!ContentType) {
      throw new AppError('ContentType error!');
    }

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${directory}`,
        Key: filename,
        ACL: 'public-read',
        Body: file,
        ContentType
      })
      .promise();

    await fs.promises.unlink(originalName);

    return filename;
  }

  async delete(filename: string, directory: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${directory}`,
        Key: filename
      })
      .promise();
  }
}

export default S3Storage;
