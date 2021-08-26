import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';

class RefreshTokensRepositoryInMemory implements IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByUserIdAndToken(
    userId: string,
    token: string
  ): Promise<RefreshToken | undefined> {
    throw new Error('Method not implemented.');
  }
}

export default RefreshTokensRepositoryInMemory;
