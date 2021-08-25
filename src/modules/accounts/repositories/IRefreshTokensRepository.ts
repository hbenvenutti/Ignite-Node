import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';

interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
}

export default IRefreshTokensRepository;
