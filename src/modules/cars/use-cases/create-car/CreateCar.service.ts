import { inject, injectable } from 'tsyringe';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateCar {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const carExists = await this.carsRepository.findByLicense(license_plate);

    if (carExists) {
      throw new AppError('Car already exists', 400);
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    return car;
  }
}

export default CreateCar;
