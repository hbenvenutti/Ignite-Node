import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';

class RefreshTokensRepositoryInMemory implements IRefreshTokensRepository {
  private refreshTokens: RefreshToken[] = [];

  async create(data: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const token = new RefreshToken();
    Object.assign(token, data);

    this.refreshTokens.push(token);
    return token;
  }

  async delete(id: string): Promise<void> {
    const index = this.refreshTokens.findIndex(
      refreshToken => refreshToken.id === id
    );

    this.refreshTokens.splice(index, 1);
  }

  async findByUserIdAndToken(
    userId: string,
    token: string
  ): Promise<RefreshToken | undefined> {
    const refreshToken = this.refreshTokens.find(
      refreshToken =>
        refreshToken.user_id === userId && refreshToken.token === token
    );

    return refreshToken;
  }
}

export default RefreshTokensRepositoryInMemory;
