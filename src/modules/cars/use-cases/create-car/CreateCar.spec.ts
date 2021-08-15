import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCar from './CreateCar.service';

describe('Create Car', () => {
  let carsRepository: ICarsRepository;
  let createCar: CreateCar;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCar = new CreateCar(carsRepository);
  });

  it('should create a car', async () => {
    await createCar.execute({
      name: 'foo',
      description: 'foo',
      daily_rate: 12,
      license_plate: 'foo123',
      fine_amount: 12,
      category_id: 'id',
      brand: 'foo motors'
    });

    const car = await carsRepository.findByLicense('foo123');

    expect(car).toHaveProperty('id');
  });

  it('should not create a car with used license plate', async () => {
    await createCar.execute({
      name: 'foo',
      description: 'foo',
      daily_rate: 12,
      license_plate: 'foo123',
      fine_amount: 12,
      category_id: 'id',
      brand: 'foo motors'
    });

    expect(async () => {
      await createCar.execute({
        name: 'foo',
        description: 'foo',
        daily_rate: 12,
        license_plate: 'foo123',
        fine_amount: 12,
        category_id: 'id',
        brand: 'foo motors'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a car with default availability true', async () => {
    const car = await createCar.execute({
      name: 'foo',
      description: 'foo',
      daily_rate: 12,
      license_plate: 'foo123',
      fine_amount: 12,
      category_id: 'id',
      brand: 'foo motors'
    });

    expect(car.available).toBe(true);
  });
});
