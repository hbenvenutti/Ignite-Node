import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '@accounts:dtos/ICreateUserDTO';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import AppError from '@errors/AppError';

@injectable()
export default class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license
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
      driver_license
    });
  }
}
