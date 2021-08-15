import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import ListCars from './listCars.service';

describe('List Cars', () => {
  let carsRepository: CarsRepositoryInMemory;
  let listCars: ListCars;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCars = new ListCars(carsRepository);
  });

  it('should list all cars', async () => {
    const car = await carsRepository.create({
      name: 'Teste T1',
      description: 'Teste T1',
      daily_rate: 10,
      license_plate: 'TEST-0101',
      fine_amount: 10,
      brand: 'Teste',
      category_id: 'cat id',
    });

    const cars = await listCars.execute({});

    expect(cars).toEqual([car]);
  });

  it('should list all cars by name', async () => {
    const name = 'Teste T1';
    const car = await carsRepository.create({
      name,
      description: 'Teste T1',
      daily_rate: 10,
      license_plate: 'TEST-0101',
      fine_amount: 10,
      brand: 'Teste',
      category_id: 'cat id',
    });

    const cars = await listCars.execute({ name });

    expect(cars).toEqual([car]);
  });

  it('should list all cars by brand', async () => {
    const brand = 'Teste';
    const car = await carsRepository.create({
      name: 'Teste T1',
      description: 'Teste T1',
      daily_rate: 10,
      license_plate: 'TEST-0101',
      fine_amount: 10,
      brand,
      category_id: 'cat id',
    });

    const cars = await listCars.execute({ brand });

    expect(cars).toEqual([car]);
  });

  it('should list all cars by category', async () => {
    const categoryId = 'Category 1';
    const car = await carsRepository.create({
      name: 'Teste T1',
      description: 'Teste T1',
      daily_rate: 10,
      license_plate: 'TEST-0101',
      fine_amount: 10,
      brand: 'Teste',
      category_id: categoryId,
    });

    const cars = await listCars.execute({ categoryId });

    expect(cars).toEqual([car]);
  });
});
