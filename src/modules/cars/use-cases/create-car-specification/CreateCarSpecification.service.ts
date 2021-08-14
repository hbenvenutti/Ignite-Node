import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  specificationId: string;
}

@injectable()
class CreateCarSpecification {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ carId, specificationId }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new AppError('Car does not exist', 400);
    }

    const specification = await this.specificationsRepository.findById(
      specificationId,
    );

    if (!specification) {
      throw new AppError('Specification does not exist', 400);
    }
  }
}

export default CreateCarSpecification;
