import { container } from 'tsyringe';

import IEmailProvider from './IEmailProvider';
import EtherealMail from './implementations/EtherealMail';
import SES from './implementations/SES.provider';

// *** -------------------------- Config ---------------------------------------------------- *** //
const mailProvider = {
  ethereal: container.resolve(EtherealMail),
  ses: container.resolve(SES)
};

let provider;

if (process.env.MAIL_PROVIDER === 'ses') {
  provider = mailProvider.ses;
} else {
  provider = mailProvider.ethereal;
}

// ---------------------------------------------------------------------------------------------- //
container.registerInstance<IEmailProvider>('EmailProvider', provider);
