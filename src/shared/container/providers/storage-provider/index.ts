import { container } from 'tsyringe';

import LocalStorage from './implementations/LocalStorage';
import S3Storage from './implementations/S3Storage';
import IStorageProvider from './IStorageProvider';

// *** -------------------------- Config ---------------------------------------------------- *** //
const storageProvider = {
  local: container.resolve(LocalStorage),
  s3: container.resolve(S3Storage)
};

let provider;

if (process.env.STORAGE_PROVIDER === 's3') {
  provider = storageProvider.s3;
} else {
  provider = storageProvider.local;
}

// ---------------------------------------------------------------------------------------------- //
container.registerSingleton<IStorageProvider>('StorageProvider', LocalStorage);
