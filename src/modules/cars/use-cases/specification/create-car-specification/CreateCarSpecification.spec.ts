import Car from '@modules/cars/infra/typeorm/entities/Car';
import Specification from '@modules/cars/infra/typeorm/entities/Specification';
import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarSpecification from './CreateCarSpecification.service';

describe('Create car specification', () => {
  let carRepository: CarsRepositoryInMemory;
  let specificationsRepository: SpecificationsRepositoryInMemory;
  let createCarSpecification: CreateCarSpecification;

  let specification: Specification;
  let car: Car;

  beforeEach(async () => {
    carRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecification = new CreateCarSpecification(
      carRepository,
      specificationsRepository
    );

    car = await carRepository.create({
      brand: 'brand',
      category_id: '12345',
      daily_rate: 10,
      description: 'test',
      fine_amount: 10,
      license_plate: 'test-0001',
      name: 'test'
    });

    specification = await specificationsRepository.create({
      description: 'specification',
      name: 'spec'
    });
  });

  it('should add a specification to a car', async () => {
    const updatedCar = await createCarSpecification.execute({
      carId: car.id,
      specificationsId: [specification.id]
    });

    expect(updatedCar.id).toEqual(car.id);
    expect(updatedCar).toHaveProperty('specifications');
    expect(updatedCar.specifications.length).toBe(1);
    expect(updatedCar.specifications[0].id).toEqual(specification.id);
  });

  it('should not add a specification to a inexistent car', async () => {
    const carId = '1234';
    const specificationId = '5678';

    expect(async () => {
      await createCarSpecification.execute({
        carId,
        specificationsId: [specificationId]
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not add an existing specification to a car', async () => {
    const carId = '1234';
    const specificationId = '5678';

    expect(async () => {
      await createCarSpecification.execute({
        carId,
        specificationsId: [specificationId]
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
