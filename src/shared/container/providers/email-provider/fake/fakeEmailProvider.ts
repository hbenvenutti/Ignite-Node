import { PasswordRecoveryTemplateVars } from '@accounts:types/email/email';

import IEmailProvider from '../IEmailProvider';

type Message = {
  to: string;
  subject: string;
  vars: PasswordRecoveryTemplateVars;
  template: string;
};

class FakeEmailProvider implements IEmailProvider {
  private inbox: Message[] = [];

  async sendMail(
    to: string,
    subject: string,
    vars: PasswordRecoveryTemplateVars,
    template: string
  ): Promise<void> {
    this.inbox.push({ to, subject, vars, template });
  }
}

export default FakeEmailProvider;
