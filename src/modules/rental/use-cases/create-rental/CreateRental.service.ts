import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@cars:irepos/ICarsRepository';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';
import Rental from '@rental:entities/Rental';
import IRentalsRepository from '@rental:irepos/IRentalsRepository';

interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRental {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    carId,
    userId,
    expectedReturnDate
  }: IRequest): Promise<Rental> {
    // *** Car Verification --------------------------------------------- *** /
    // // const car = await this.carsRepository.findById(carId);
    const carRental = await this.rentalsRepository.findByCar(carId);

    if (carRental) {
      throw new AppError('Car unavailable');
    }

    // * User Verification -------------------------------------------------- //
    const rental = await this.rentalsRepository.findByUser(userId);

    if (rental) {
      throw new AppError('User has an active rental');
    }

    // * Date Verification -------------------------------------------------- //
    const minimumRentTime = 24;

    const now = this.dateProvider.now();

    const rentTime = this.dateProvider.compare(now, expectedReturnDate);

    if (rentTime < minimumRentTime) {
      throw new AppError('Rental time must be 24h minimum');
    }

    await this.carsRepository.updateAvailability(carId, false);

    return this.rentalsRepository.create({ userId, carId, expectedReturnDate });
  }
}

export default CreateRental;
