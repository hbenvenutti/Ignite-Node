import { container } from 'tsyringe';

import IEmailProvider from './IEmailProvider';
import EtherealProvider from './implementations/EtherealProvider';

container.registerSingleton<IEmailProvider>('EmailProvider', EtherealProvider);
