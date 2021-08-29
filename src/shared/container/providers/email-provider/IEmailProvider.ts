import { Email } from '@accounts:types/credentials/credentials';

interface IEmailProvider {
  sendMail(to: Email, subject: string, body: string): Promise<void>;
}

export default IEmailProvider;
