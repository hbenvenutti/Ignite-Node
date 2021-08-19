import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IRentalsRepository from '@modules/rental/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

class CreateRental {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    carId,
    userId,
    expectedReturnDate
  }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(carId);
    const carRental = await this.rentalsRepository.findByCar(carId);

    if (!car?.available || carRental) {
      throw new AppError('Car unavailable');
    }

    const rental = await this.rentalsRepository.findByUser(userId);

    if (rental) {
      throw new AppError('User has an active rental');
    }
  }
}

export default CreateRental;
