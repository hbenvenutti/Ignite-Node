import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';
import { ConnectionIsNotSetError } from 'typeorm';

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
  }: ICreateCarDTO): Promise<void> {
    const car = await this.carsRepository.findByLicense(license_plate);

    if (car) {
      throw new AppError('Car already exists', 400);
    }
    await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });
  }
}

export default CreateCar;
