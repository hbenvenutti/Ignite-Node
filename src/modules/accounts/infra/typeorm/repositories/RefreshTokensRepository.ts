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

    await this.repository.save(refreshToken);

    return refreshToken;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndToken(
    user_id: string,
    token: string
  ): Promise<RefreshToken | undefined> {
    return this.repository.findOne({ user_id, token });
  }
}

export default RefreshTokensRepository;
