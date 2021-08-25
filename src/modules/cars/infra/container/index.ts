import { container } from 'tsyringe';

import ICarsRepository from '@cars:irepos/ICarsRepository';
import ICategoriesRepository from '@cars:irepos/ICategoriesRepository';
import IImagesRepository from '@cars:irepos/IImagesRepository';
import ISpecificationsRepository from '@cars:irepos/ISpecificationsRepository';
import CarsRepository from '@cars:repos/CarsRepository';
import CategoriesRepository from '@cars:repos/CategoriesRepository';
import ImagesRepository from '@cars:repos/ImagesRepository';
import SpecificationsRepository from '@cars:repos/SpecificationsRepository';

// *** ------------------------ Cars ------------------------------------ *** //
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

// *** ------------------------ Categories ------------------------------ *** //
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

// *** ------------------------ Specification --------------------------- *** //
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

// *** ------------------------ Images ---------------------------------- *** //
container.registerSingleton<IImagesRepository>(
  'ImagesRepository',
  ImagesRepository
);
