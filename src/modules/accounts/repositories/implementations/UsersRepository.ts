import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/user';
import IUsersRepository from '../IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      driver_license,
      email,
    });

    await this.repository.save(user);
  }
}
