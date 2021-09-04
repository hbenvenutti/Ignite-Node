import ICreateUserDTO from '@accounts:dtos/ICreateUserDTO';
import User from '@accounts:entities/User';

import { Email, UserId } from '../@types/credentials/credentials';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(user: User): Promise<void>;
  findByEmail(email: Email): Promise<User | undefined>;
  findById(id: UserId): Promise<User | undefined>;
}
