import { inject, injectable } from 'tsyringe';

import Car from '@cars:entities/Car';
import ICarsRepository from '@cars:irepos/ICarsRepository';
import ISpecificationsRepository from '@cars:irepos/ISpecificationsRepository';
import AppError from '@errors/AppError';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateCarSpecification {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new AppError('Car does not exist', 400);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsId
    );

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}

export default CreateCarSpecification;
