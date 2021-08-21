import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateUser from '../create-user/CreateUser.service';
import AuthenticateUser from './AuthenticateUser.service';

describe('Authenticate User', () => {
  let usersRepository: UsersRepositoryInMemory;
  let createUser: CreateUser;
  let authenticateUser: AuthenticateUser;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUser = new CreateUser(usersRepository);
    authenticateUser = new AuthenticateUser(usersRepository);
  });

  it('should authenticate user', async () => {
    const email = 'foo@example.com';
    const password = 'foo123';

    await createUser.execute({
      name: 'foo',
      password,
      driver_license: '123456',
      email,
      avatar: undefined
    });

    const response = await authenticateUser.execute({ email, password });

    expect(response).toHaveProperty('token');
  });

  it('should not authenticate user with an inexistent email', () => {
    expect(async () => {
      await authenticateUser.execute({
        email: 'foo@example.com',
        password: '12345'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate user without the right password', async () => {
    const email = 'foo@example.com';

    await createUser.execute({
      name: 'foo',
      driver_license: '1234',
      email,
      password: '12345'
    });

    expect(async () => {
      await authenticateUser.execute({ email, password: 'wrong-password' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
