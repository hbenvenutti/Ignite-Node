import path from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import { Email } from '@accounts:types/credentials/credentials';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';
import IEmailProvider from '@providers/email-provider/IEmailProvider';

@injectable()
class SendPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('EmailProvider')
    private emailProvider: IEmailProvider,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(email: Email): Promise<void> {
    const template = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'email',
      'passwordRecoveryEmail.hbs'
    );

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found!');
    }

    const token = uuid();

    const expirationDate = this.dateProvider.addHours(3);

    /*
      ? Refresh Token was called UserToken in class
      ? They used the same class to store refresh token and password token
    */
    await this.refreshTokensRepository.create({
      expirationDate,
      token,
      userId: user.id
    });

    const vars = {
      name: user.name,
      link: `${process.env.PASSWORD_RECOVERY_URL}${token}`
    };

    await this.emailProvider.sendMail(email, 'Recuperação de senha', vars, template);
  }
}

export default SendPasswordEmail;
