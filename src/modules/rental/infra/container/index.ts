import { container } from 'tsyringe';

import IRentalsRepository from '@rental:irepos/IRentalsRepository';
import RentalsRepository from '@rental:repos/RentalsRepository';

// *** ------------------------ Rentals --------------------------------- *** //
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);
