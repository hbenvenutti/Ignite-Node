import { container } from 'tsyringe';

import '@shared/container/providers';

import IUsersRepository from '@accounts:irepos/IUsersRepository';
import UsersRepository from '@accounts:repos/UsersRepository';
import ICarsRepository from '@cars:irepos/ICarsRepository';
import ICategoriesRepository from '@cars:irepos/ICategoriesRepository';
import IImagesRepository from '@cars:irepos/IImagesRepository';
import ISpecificationsRepository from '@cars:irepos/ISpecificationsRepository';
import CarsRepository from '@cars:repos/CarsRepository';
import CategoriesRepository from '@cars:repos/CategoriesRepository';
import ImagesRepository from '@cars:repos/ImagesRepository';
import SpecificationsRepository from '@cars:repos/SpecificationsRepository';
import IRentalsRepository from '@rental:irepos/IRentalsRepository';
import RentalsRepository from '@rental:repos/RentalsRepository';

// * -------------------------- Cars -------------------------------------- * */
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

// *** -------------------------- Categories ---------------------------- *** */
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
