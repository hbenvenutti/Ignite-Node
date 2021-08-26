import { inject, injectable } from 'tsyringe';

import ITokenProvider from '@accounts:container/provider/token-provider/ITokenProvider';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';

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

    const refreshToken = await this.refreshTokensRepository.findByUserId(
      userId
    );
  }
}

export default RefreshToken;
