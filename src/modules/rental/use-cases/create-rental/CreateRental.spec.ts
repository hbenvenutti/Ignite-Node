import Car from '@cars:entities/Car';
import CarsRepositoryInMemory from '@cars:mocks/CarsRepositoryInMemory';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';
import DayJs from '@providers/date-provider/implementations/DayJs.provider';
import RentalsRepositoryInMemory from '@rental:mocks/RentalsRepositoryInMemory';

import CreateRental from './CreateRental.service';

describe('Create Rental', () => {
  // ? Only modify new DayJS() to change provider. No further changes are needed. */
  const dateProvider: IDateProvider = new DayJs();
  let createRental: CreateRental;
  let rentalsRepository: RentalsRepositoryInMemory;
  let carsRepository: CarsRepositoryInMemory;
  let car: Car;
  let car2: Car;

  beforeEach(async () => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRental = new CreateRental(
      rentalsRepository,
      // //carsRepository,
      dateProvider
    );

    car = await carsRepository.create({
      name: 'test',
      brand: 'test',
      category_id: 'category test',
      daily_rate: 10,
      description: 'test description',
      fine_amount: 10,
      license_plate: 'test0101'
    });

    car2 = await carsRepository.create({
      name: 'test',
      brand: 'test',
      category_id: 'category test',
      daily_rate: 10,
      description: 'test description',
      fine_amount: 10,
      license_plate: 'test0102'
    });
  });

  it('should create a new rental', async () => {
    const rental = await createRental.execute({
      carId: car.id,
      userId: '67891',
      expectedReturnDate: dateProvider.tomorrow()
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not create a rent with return time lower than 24h', async () => {
    expect(async () => {
      await createRental.execute({
        carId: car.id,
        userId: '67891',
        expectedReturnDate: dateProvider.now()
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a rental when user has an active rent', async () => {
    expect(async () => {
      await createRental.execute({
        carId: car.id,
        userId: '67891',
        expectedReturnDate: dateProvider.tomorrow()
      });

      await createRental.execute({
        carId: car2.id,
        userId: '67891',
        expectedReturnDate: dateProvider.tomorrow()
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a rent when the car is already rented', async () => {
    expect(async () => {
      await createRental.execute({
        carId: car.id,
        userId: '67891',
        expectedReturnDate: dateProvider.tomorrow()
      });

      await createRental.execute({
        carId: car.id,
        userId: '67892',
        expectedReturnDate: dateProvider.tomorrow()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
