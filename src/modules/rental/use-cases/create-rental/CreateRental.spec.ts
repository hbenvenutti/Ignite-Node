import dayjs from 'dayjs';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rental/repositories/in-memory/RentalsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateRental from './CreateRental.service';

describe('Create Rental', () => {
  const tomorrow = dayjs().add(1, 'day').toDate();

  let createRental: CreateRental;
  let rentalsRepository: RentalsRepositoryInMemory;
  let carsRepository: CarsRepositoryInMemory;
  let car: Car;
  let car2: Car;

  beforeEach(async () => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRental = new CreateRental(rentalsRepository, carsRepository);

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
      expectedReturnDate: tomorrow
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not create a rent with return time lower than 24h', async () => {
    expect(async () => {
      await createRental.execute({
        carId: car.id,
        userId: '67891',
        expectedReturnDate: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a rental when user has an active rent', async () => {
    expect(async () => {
      await createRental.execute({
        carId: car.id,
        userId: '67891',
        expectedReturnDate: tomorrow
      });

      await createRental.execute({
        carId: car2.id,
        userId: '67891',
        expectedReturnDate: tomorrow
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a rent when the car is already rented', async () => {
    expect(async () => {
      await createRental.execute({
        carId: car.id,
        userId: '67891',
        expectedReturnDate: tomorrow
      });

      await createRental.execute({
        carId: car.id,
        userId: '67892',
        expectedReturnDate: tomorrow
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
