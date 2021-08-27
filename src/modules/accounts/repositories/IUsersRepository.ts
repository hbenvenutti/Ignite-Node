import ICreateUserDTO from '@accounts:dtos/ICreateUserDTO';
import User from '@accounts:entities/User';

import { Email, Uuid } from '../@types/credentials/credentials';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: Email): Promise<User | undefined>;
  findById(id: Uuid): Promise<User | undefined>;
}
