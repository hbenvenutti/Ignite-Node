import { container } from 'tsyringe';

import AppError from '@errors/AppError';

import IDateProvider from './date-provider/IDate.provider';
import DayJs from './date-provider/implementations/DayJs.provider';
import IEmailProvider from './email-provider/IEmailProvider';
import EtherealMail from './email-provider/implementations/EtherealMail';
import LocalStorage from './storage-provider/implementations/LocalStorage';
import S3Storage from './storage-provider/implementations/S3Storage';
import IStorageProvider from './storage-provider/IStorageProvider';

container.registerInstance<IEmailProvider>('EmailProvider', new EtherealMail());

container.registerSingleton<IDateProvider>('DateProvider', DayJs);

if (!process.env.disk) {
  throw new AppError('disk not specified!');
}

let diskStorage;

if (process.env.disk === 'local') {
  diskStorage = LocalStorage;
} else {
  diskStorage = S3Storage;
}

container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage);
