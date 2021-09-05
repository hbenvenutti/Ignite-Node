import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const tmpDir = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpDir,
  storage: multer.diskStorage({
    destination: tmpDir,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    }
  })
};
