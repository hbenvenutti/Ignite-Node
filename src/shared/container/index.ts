import { container } from 'tsyringe';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import ImagesRepository from '@modules/cars/infra/typeorm/repositories/ImagesRepository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository';
import IImagesRepository from '@modules/cars/repositories/IImagesRepository';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import RentalsRepository from '@modules/rental/infra/typeorm/repositories/RentalsRepository';
import IRentalsRepository from '@modules/rental/repositories/IRentalsRepository';

import IDateProvider from './providers/date-provider/IDate.provider';
import DayJs from './providers/date-provider/implementations/DayJs.provider';

// * -------------------------- Cars -------------------------------------- * */
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

// * -------------------------- Categories -------------------------------- * */
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

// * -------------------------- Users --------------------------------------- */
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

// * -------------------------- Images -------------------------------------- */
container.registerSingleton<IImagesRepository>(
  'ImagesRepository',
  ImagesRepository
);

// * -------------------------- Rentals ------------------------------------- */
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);

// * -------------------------- Providers --------------------------------- * */
container.registerSingleton<IDateProvider>('DateProvider', DayJs);
