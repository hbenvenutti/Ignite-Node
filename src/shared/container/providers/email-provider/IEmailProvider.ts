import { Email } from '@accounts:types/credentials/credentials';
import {
  EmailBodyTemplate,
  PasswordRecoveryTemplateVars
} from '@accounts:types/email/email';

interface IEmailProvider {
  sendMail(
    to: Email,
    subject: string,
    vars: PasswordRecoveryTemplateVars,
    template: EmailBodyTemplate
  ): Promise<void>;
}

export default IEmailProvider;
