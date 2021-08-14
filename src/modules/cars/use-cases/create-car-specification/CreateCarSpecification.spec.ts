import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCar from '../create-car/CreateCar.service';
import CreateCarSpecification from './CreateCarSpecification.service';

describe('Create car specification', () => {
  let carRepository: CarsRepositoryInMemory;
  let specificationsRepository: SpecificationsRepositoryInMemory;
  let createCar: CreateCar;
  let createCarSpecification: CreateCarSpecification;

  beforeEach(async () => {
    carRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecification = new CreateCarSpecification(
      carRepository,
      specificationsRepository,
    );

    await carRepository.create({
      brand: 'brand',
      category_id: '12345',
      daily_rate: 10,
      description: 'teste',
      fine_amount: 10,
      license_plate: 'test-0001',
      name: 'teste',
    });
  });

  it('should add a specification to a car', async () => {
    const carId = '1234';
    const specificationId = '5678';

    const car = await carRepository.create({
      brand: 'brand',
      category_id: '12345',
      daily_rate: 10,
      description: 'teste',
      fine_amount: 10,
      license_plate: 'test-0002',
      name: 'teste',
    });

    await createCarSpecification.execute({ carId: car.id, specificationId });
  });

  it('should not add a specification to a inexistent car', async () => {
    const carId = '1234';
    const specificationId = '5678';

    expect(async () => {
      await createCarSpecification.execute({ carId, specificationId });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not add an existing specification to a car', async () => {
    const carId = '1234';
    const specificationId = '5678';

    expect(async () => {
      await createCarSpecification.execute({ carId, specificationId });
    }).rejects.toBeInstanceOf(AppError);
  });
});
