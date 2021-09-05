import fs from 'fs';
import path from 'path';

import upload from '@config/files/upload';

import IStorageProvider from '../IStorageProvider';

class LocalStorage implements IStorageProvider {
  async save(file: string, directory: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tmpDir, file),
      path.resolve(upload.tmpDir, directory, file)
    );

    return file;
  }

  async delete(file: string, directory: string): Promise<void> {
    const filePath = path.resolve(upload.tmpDir, directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default LocalStorage;
