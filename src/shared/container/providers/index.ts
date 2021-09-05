import { container } from 'tsyringe';

import IDateProvider from './date-provider/IDate.provider';
import DayJs from './date-provider/implementations/DayJs.provider';
import IEmailProvider from './email-provider/IEmailProvider';
import EtherealMail from './email-provider/implementations/EtherealMail';
import LocalStorage from './storage-provider/implementations/LocalStorage';
import IStorageProvider from './storage-provider/IStorageProvider';

container.registerInstance<IEmailProvider>('EmailProvider', new EtherealMail());

container.registerSingleton<IDateProvider>('DateProvider', DayJs);

container.registerSingleton<IStorageProvider>('StorageProvider', LocalStorage);
