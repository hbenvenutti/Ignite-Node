import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError(`Email ${email} already exists`);
    }

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
