import ICreateUserDTO from '@accounts:dtos/ICreateUserDTO';
import User from '@accounts:entities/user';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
