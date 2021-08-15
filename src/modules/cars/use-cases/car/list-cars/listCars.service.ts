import { inject, injectable } from 'tsyringe';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  brand?: string;
  categoryId?: string;
  name?: string;
}

@injectable()
class ListCars {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ brand, categoryId, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      categoryId,
      name,
    );

    // console.log('service: ', cars);

    return cars;
  }
}

export default ListCars;
