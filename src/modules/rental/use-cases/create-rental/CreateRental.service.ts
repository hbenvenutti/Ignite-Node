import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Rental from '@modules/rental/infra/typeorm/entities/Rental';
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
    dayjs.extend(utc);
    const minimumRentTime = 24;
    const parsedReturnDate = dayjs(expectedReturnDate).utc().local().format();
    const now = dayjs().utc().local().format();
    const rentTime = dayjs(parsedReturnDate).diff(now, 'hours');

    if (rentTime < minimumRentTime) {
      throw new AppError('Rental time must be 24h minimum');
    }

    return this.rentalsRepository.create({ userId, carId, expectedReturnDate });
  }
}

export default CreateRental;
