import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import RefreshTokensRepositoryInMemory from '@accounts:mocks/RefreshTokensRepositoryInMemory';
import UsersRepositoryInMemory from '@accounts:mocks/UsersRepositoryInMemory';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';
import DayJsProvider from '@providers/date-provider/implementations/DayJs.provider';
import FakeEmailProvider from '@providers/email-provider/fake/fakeEmailProvider';
import IEmailProvider from '@providers/email-provider/IEmailProvider';

import SendPasswordEmail from '../SendPasswordEmail.service';

describe('Password Recovery Email Service', () => {
  let passwordRecovery: SendPasswordEmail;
  let usersRepository: IUsersRepository;
  let tokensRepository: IRefreshTokensRepository;
  let emailProvider: IEmailProvider;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    // ! ------------------ Providers & Repositories ------------------------------------------ ! //
    usersRepository = new UsersRepositoryInMemory();
    tokensRepository = new RefreshTokensRepositoryInMemory();
    emailProvider = new FakeEmailProvider();
    dateProvider = new DayJsProvider();
    // ! -------------------------------------------------------------------------------------- ! //

    passwordRecovery = new SendPasswordEmail(
      usersRepository,
      tokensRepository,
      emailProvider,
      dateProvider
    );
  });

  it('should send a password recovery email to user', async () => {
    const sendMail = jest.spyOn(emailProvider, 'sendMail');

    await usersRepository.create({
      name: 'John',
      email: 'john@foo.com',
      driver_license: 'foobar',
      password: 'foobar'
    });

    await passwordRecovery.execute('john@foo.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should create a recovery token', async () => {
    const create = jest.spyOn(tokensRepository, 'create');

    await usersRepository.create({
      name: 'John',
      email: 'john@foo.com',
      driver_license: 'foobar',
      password: 'foobar'
    });

    await passwordRecovery.execute('john@foo.com');

    expect(create).toHaveBeenCalled();
  });

  it('should not send email to inexistent user', async () => {
    await usersRepository.create({
      name: 'John',
      email: 'john@foo.com',
      driver_license: 'foobar',
      password: 'foobar'
    });

    await expect(passwordRecovery.execute('john@bar.com')).rejects.toEqual(
      new AppError('User not found!')
    );
  });
});
