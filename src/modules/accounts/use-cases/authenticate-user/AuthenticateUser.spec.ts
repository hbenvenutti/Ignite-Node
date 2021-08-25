import JWTProvider from '@accounts:container/provider/token-provider/implementations/JWTProvider';
import ITokenProvider from '@accounts:container/provider/token-provider/ITokenProvider';
import RefreshTokensRepositoryInMemory from '@accounts:mocks/RefreshTokensRepositoryInMemory';
import UsersRepositoryInMemory from '@accounts:mocks/UsersRepositoryInMemory';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';
import DayJsProvider from '@providers/date-provider/implementations/DayJs.provider';

import CreateUser from '../create-user/CreateUser.service';
import AuthenticateUser from './AuthenticateUser.service';

/* -------------------------------------------------------------------------- */

describe('Authenticate User', () => {
  let usersRepository: UsersRepositoryInMemory;
  let refreshTokensRepository: RefreshTokensRepositoryInMemory;
  let tokenProvider: ITokenProvider;
  let dateProvider: IDateProvider;
  let createUser: CreateUser;
  let authenticateUser: AuthenticateUser;

  beforeEach(() => {
    // ! ----------- Change provider in this section only ----------------- ! //

    tokenProvider = new JWTProvider();
    dateProvider = new DayJsProvider();

    // ---------------------------------------------------------------------- //

    usersRepository = new UsersRepositoryInMemory();
    refreshTokensRepository = new RefreshTokensRepositoryInMemory();
    createUser = new CreateUser(usersRepository);
    authenticateUser = new AuthenticateUser(
      usersRepository,
      refreshTokensRepository,
      tokenProvider,
      dateProvider
    );
  });

  // ------------------------------------------------------------------------ //

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

  // ------------------------------------------------------------------------ //

  it('should not authenticate user with an inexistent email', () => {
    expect(async () => {
      await authenticateUser.execute({
        email: 'foo@example.com',
        password: '12345'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // ------------------------------------------------------------------------ //

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
