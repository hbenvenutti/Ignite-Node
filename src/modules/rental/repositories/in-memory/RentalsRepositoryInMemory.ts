import ICreateRentalDTO from '@modules/rental/dtos/ICreateRental';
import Rental from '@modules/rental/infra/typeorm/entities/Rental';

import IRentalsRepository from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create(dto: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id: dto.carId,
      user_id: dto.userId,
      expected_return_date: dto.expectedReturnDate,
      start_date: new Date()
    });

    this.rentals.push(rental);

    return rental;
  }

  async findByCar(carId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.car_id === carId && !rental.end_date
    );
  }

  async findAllByCar(carId: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.car_id === carId);
  }

  async findByUser(userId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.user_id === userId && !rental.end_date
    );
  }

  async findAllByUser(userId: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === userId);
  }
}

export default RentalsRepositoryInMemory;
