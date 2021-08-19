import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rental/repositories/in-memory/RentalsRepositoryInMemory';

import CreateRental from './CreateRental.service';

describe('Create Rental', () => {
  let createRental: CreateRental;
  let rentalsRepository: RentalsRepositoryInMemory;
  let carsRepository: CarsRepositoryInMemory;

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRental = new CreateRental(rentalsRepository, carsRepository);
  });

  it('should create a new rental', async () => {
    await createRental.execute({
      carId: '12345',
      userId: '67891',
      expectedReturnDate: new Date()
    });
  });

  it('should create a rent with 24h minimum', async () => {});

  it('should not create a rental when user has an active rent', async () => {});

  it('should not create a rent when the car is already rented', async () => {});
});
