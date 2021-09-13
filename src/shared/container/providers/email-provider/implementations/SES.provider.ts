import aws from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { Email } from '@accounts:types/credentials/credentials';
import { EmailBodyTemplate, PasswordRecoveryTemplateVars } from '@accounts:types/email/email';

import IEmailProvider from '../IEmailProvider';

class SES implements IEmailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION
      })
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

    await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com>',
      subject,
      html
    });
  }
}

export default SES;
