import { inject, injectable } from 'tsyringe';

import ITokenProvider from '@accounts:container/provider/token-provider/ITokenProvider';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import AppError from '@errors/AppError';

@injectable()
class RefreshToken {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute(token: string): Promise<any> {
    const userId = this.tokenProvider.verifyRefreshToken(token);

    const refreshToken =
      await this.refreshTokensRepository.findByUserIdAndToken(userId, token);

    if (!refreshToken) {
      throw new AppError('Token not found!');
    }

    await this.refreshTokensRepository.delete(refreshToken.id);
  }
}

export default RefreshToken;
