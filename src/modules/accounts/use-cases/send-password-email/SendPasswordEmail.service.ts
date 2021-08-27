import { Email } from 'modules/accounts/@types/credentials/credentials';
import { inject, injectable } from 'tsyringe';

import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import IEmailProvider from '@providers/email-provider/IEmailProvider';

@injectable()
class SendPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('EmailProvider')
    private emailProvider: IEmailProvider
  ) {}

  async execute(email: Email): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
  }
}

export default SendPasswordEmail;
