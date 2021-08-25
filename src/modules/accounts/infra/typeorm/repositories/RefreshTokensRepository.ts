import { getRepository, Repository } from 'typeorm';

import ICreateRefreshTokenDTO from '@accounts:dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@accounts:entities/RefreshToken';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = getRepository(RefreshToken);
  }
  async create(data: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const { userId, expireDate, token } = data;
    const refreshToken = this.repository.create({
      user_id: userId,
      expire_date: expireDate,
      token
    });

    return refreshToken;
  }
}

export default RefreshTokensRepository;
