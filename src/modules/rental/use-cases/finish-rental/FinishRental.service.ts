import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@cars:irepos/ICarsRepository';
import AppError from '@errors/AppError';
import IRentalsRepository from '@rental:irepos/IRentalsRepository';

interface IRequest {
  id: string;
  userId: string;
}
@injectable()
class FinishRental {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, userId }: IRequest): Promise<void> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental not found', 404);
    }
  }
}

export default FinishRental;
