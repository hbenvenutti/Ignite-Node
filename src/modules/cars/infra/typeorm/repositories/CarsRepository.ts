import { getRepository, Repository } from 'typeorm';

import ICreateCarDTO from '@cars:dtos/ICreateCarDTO';
import IUpdateCarDTO from '@cars:dtos/IUpdateCarDTO';
import Car from '@cars:entities/Car';
import ICarsRepository from '@cars:irepos/ICarsRepository';

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
      name
    } = data;

    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });

    this.repository.save(car);

    return car;
  }

  async update(data: IUpdateCarDTO): Promise<Car> {
    const {
      id,
      category_id,
      specifications,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    } = data;

    const car = this.repository.create({
      id,
      category_id,
      specifications,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });

    await this.repository.save(car);

    return car;
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
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

  async findById(id: string): Promise<Car | undefined> {
    return this.repository.findOne({ id });
  }

  async findByLicense(license_plate: string): Promise<Car | undefined> {
    return this.repository.findOne({ license_plate });
  }
}

export default CarsRepository;
