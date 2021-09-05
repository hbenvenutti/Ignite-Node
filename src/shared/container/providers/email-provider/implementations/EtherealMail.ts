import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { TestAccount, Transporter } from 'nodemailer';

import { Email } from '@accounts:types/credentials/credentials';
import { EmailBodyTemplate, PasswordRecoveryTemplateVars } from '@accounts:types/email/email';

import IEmailProvider from '../IEmailProvider';

class EtherealMail implements IEmailProvider {
  private account: TestAccount;
  private client: Transporter;

  constructor() {
    this.configure().then();
  }

  private async configure() {
    this.account = await nodemailer.createTestAccount();

    this.client = nodemailer.createTransport({
      host: this.account.smtp.host,
      port: this.account.smtp.port,
      secure: this.account.smtp.secure,
      auth: {
        user: this.account.user,
        pass: this.account.pass
      }
    });
  }

  async sendMail(
    to: Email,
    subject: string,
    vars: PasswordRecoveryTemplateVars,
    template: EmailBodyTemplate
  ): Promise<void> {
    const body = fs.readFileSync(template).toString('utf8');
    const parsedBody = handlebars.compile(body);
    const html = parsedBody(vars);

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com>',
      subject,
      html
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default EtherealMail;
