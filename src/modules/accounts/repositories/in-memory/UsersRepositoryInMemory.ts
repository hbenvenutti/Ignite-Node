import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/user';
import IUsersRepository from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      avatar,
      driver_license,
      email,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }
}

export default UsersRepositoryInMemory;
