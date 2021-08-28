import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';

import { Token, UserId, Uuid } from '../@types/credentials/credentials';

interface IRefreshTokensRepository {
  // data: test, test
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  delete(id: Uuid): Promise<void>;
  findByUserIdAndToken(
    userId: UserId,
    token: Token
  ): Promise<RefreshToken | undefined>;
}

export default IRefreshTokensRepository;
