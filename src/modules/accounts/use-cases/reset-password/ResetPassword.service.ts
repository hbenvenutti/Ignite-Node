import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import { Password, Token } from '@accounts:types/credentials/credentials';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';

@injectable()
class ResetPassword {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: Token, password: Password): Promise<void> {
    const passwordToken = await this.refreshTokensRepository.findByToken(token);

    if (!passwordToken) {
      throw new AppError('Invalid Token!');
    }

    // *** ---------------- Token Expiration ---------------------------- *** //

    const tokenExpired = this.dateProvider.expiredDate(
      passwordToken.expire_date
    );

    if (tokenExpired) {
      throw new AppError('Expired Token!');
    }

    // *** ---------------- User Validation ----------------------------- *** //

    const user = await this.usersRepository.findById(passwordToken.user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    // *** ---------------- User Password Update ------------------------ *** //
    user.password = await hash(password, 8);

    await this.usersRepository.update(user);

    // *** ---------------- Delete Token -------------------------------- *** //
    await this.refreshTokensRepository.delete(passwordToken.id);
  }
}

export default ResetPassword;
