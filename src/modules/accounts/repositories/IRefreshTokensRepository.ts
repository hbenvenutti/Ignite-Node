import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';

import { Uuid } from '../@types/credentials/credentials';

interface IRefreshTokensRepository {
  // data: test, test
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  delete(id: Uuid): Promise<void>;
  findByUserIdAndToken(
    userId: string,
    token: string
  ): Promise<RefreshToken | undefined>;
}

export default IRefreshTokensRepository;
