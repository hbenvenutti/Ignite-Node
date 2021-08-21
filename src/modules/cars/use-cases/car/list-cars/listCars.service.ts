import { inject, injectable } from 'tsyringe';

import Car from '@cars:entities/Car';
import ICarsRepository from '@cars:irepos/ICarsRepository';

interface IRequest {
  brand?: string;
  categoryId?: string;
  name?: string;
}

@injectable()
class ListCars {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, categoryId, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      categoryId,
      name
    );

    return cars;
  }
}

export default ListCars;
