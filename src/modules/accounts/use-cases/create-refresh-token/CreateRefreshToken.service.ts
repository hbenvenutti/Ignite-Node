import { inject, injectable } from 'tsyringe';

import ITokenProvider from '@accounts:container/provider/token-provider/ITokenProvider';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import auth from '@config/auth/auth';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';

type TokenResponse = {
  jwt: string;
  refreshToken: string;
};

@injectable()
class CreateRefreshToken {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<TokenResponse> {
    const { id: userId, email } = this.tokenProvider.verifyRefreshToken(token);

    const refreshToken = await this.refreshTokensRepository.findByUserIdAndToken(userId, token);

    if (!refreshToken) {
      throw new AppError('Token not found!');
    }

    await this.refreshTokensRepository.delete(refreshToken.id);

    const jwt = this.tokenProvider.sign(userId);

    const newRefreshToken = this.tokenProvider.signRefresh(userId, email);

    const expirationDate = this.dateProvider.addDays(auth.daysInNumber);

    await this.refreshTokensRepository.create({
      userId,
      token: newRefreshToken,
      expirationDate
    });

    return {
      jwt,
      refreshToken: newRefreshToken
    };
  }
}

export default CreateRefreshToken;
