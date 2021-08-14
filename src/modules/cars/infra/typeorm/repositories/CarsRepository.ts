import { getRepository, Repository } from 'typeorm';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = data;

    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.repository.save(car);

    return car;
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('car')
      .where(`available = ${true}`);

    if (brand) {
      carsQuery.andWhere(`brand = '${brand}'`);
    }

    if (categoryId) {
      carsQuery.andWhere(`category_id = '${categoryId}'`);
    }

    if (name) {
      carsQuery.andWhere(`name = '${name}'`);
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findByLicense(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }
}

export default CarsRepository;
