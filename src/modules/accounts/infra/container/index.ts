import { container } from 'tsyringe';

import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import RefreshTokensRepository from '@accounts:repos/RefreshTokensRepository';
import UsersRepository from '@accounts:repos/UsersRepository';

// *** ------------------------ Users ----------------------------------- *** //
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

// *** ------------------------ Refresh Token --------------------------- *** //
container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository
);
