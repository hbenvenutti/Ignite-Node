import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';

interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  findByUserId(userId: string): Promise<RefreshToken | undefined>;
}

export default IRefreshTokensRepository;
