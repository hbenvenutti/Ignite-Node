import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';

interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  delete(id: string): Promise<void>;
  findByUserIdAndToken(
    userId: string,
    token: string
  ): Promise<RefreshToken | undefined>;
}

export default IRefreshTokensRepository;
