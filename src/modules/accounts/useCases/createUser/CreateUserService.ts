import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create(data);
  }
}
