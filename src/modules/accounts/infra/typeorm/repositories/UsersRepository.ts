import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@accounts:dtos/ICreateUserDTO';
import User from '@accounts:entities/user';
import IUsersRepository from '@accounts:irepos/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      driver_license,
      email,
      avatar,
      id
    });

    await this.repository.save(user);
  }
}
