import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@cars:irepos/ICarsRepository';
import AppError from '@errors/AppError';
import IDateProvider from '@providers/date-provider/IDate.provider';
import Rental from '@rental:entities/Rental';
import IRentalsRepository from '@rental:irepos/IRentalsRepository';

interface IRequest {
  id: string;
}
@injectable()
class FinishRental {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    // *** ------------------- Constants -------------------------------- *** //
    const minimumTime = 1;
    const now = this.dateProvider.now();

    // *** ------------------- Rental Verification ---------------------- *** //
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental not found', 404);
    }

    const { expected_return_date } = rental;

    // *** ------------------- Car Verification ------------------------- *** //
    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const { id: carId, daily_rate, fine_amount } = car;

    // *** ------------------- Date Verification ------------------------ *** //
    const rentalTime = this.dateProvider.compareInDays(rental.start_date, now);
    const delay = this.dateProvider.compareInDays(now, expected_return_date);

    // * - Rent Time in days - * //
    const time = rentalTime < 1 ? minimumTime : rentalTime;

    // * - Fine for returning late - * //
    const fine = delay > 0 ? delay * fine_amount : 0;

    // * - Total value to pay - * //
    const total = time * daily_rate + fine;

    // *** ------------------- Execution -------------------------------- *** //
    rental.end_date = this.dateProvider.now();
    rental.total = total;

    await this.rentalsRepository.finish(rental);
    await this.carsRepository.updateAvailability(carId, true);

    return rental;
  }
}

export default FinishRental;
