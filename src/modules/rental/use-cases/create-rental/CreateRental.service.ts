import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Rental from '@modules/rental/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rental/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/date-provider/IDate.provider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

class CreateRental {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private carsRepository: ICarsRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute({
    carId,
    userId,
    expectedReturnDate
  }: IRequest): Promise<Rental> {
    // * Car Verification --------------------------------------------------- //
    const car = await this.carsRepository.findById(carId);
    const carRental = await this.rentalsRepository.findByCar(carId);

    if (!car?.available || carRental) {
      throw new AppError('Car unavailable');
    }

    // * User Verification -------------------------------------------------- //
    const rental = await this.rentalsRepository.findByUser(userId);

    if (rental) {
      throw new AppError('User has an active rental');
    }

    // * Date Verification -------------------------------------------------- //
    const minimumRentTime = 24;

    const rentTime = this.dateProvider.compare(new Date(), expectedReturnDate);

    if (rentTime < minimumRentTime) {
      throw new AppError('Rental time must be 24h minimum');
    }

    return this.rentalsRepository.create({ userId, carId, expectedReturnDate });
  }
}

export default CreateRental;
