import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@rental:dtos/ICreateRental';
import Rental from '@rental:entities/Rental';
import IRentalsRepository from '@rental:irepos/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  // *** ---------------------- Methods --------------------------------- *** */

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const { carId, userId, expectedReturnDate } = data;

    const rental = this.repository.create({
      car_id: carId,
      user_id: userId,
      expected_return_date: expectedReturnDate
    });

    await this.repository.save(rental);

    return rental;
  }

  // *** ---------------------  Find ------------------------------------ *** */

  async findByUser(user_id: string): Promise<Rental | undefined> {
    return this.repository.findOne({ user_id });
  }

  async findAllByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({ user_id });
  }

  async findByCar(car_id: string): Promise<Rental | undefined> {
    return this.repository.findOne({ car_id });
  }

  async findAllByCar(car_id: string): Promise<Rental[]> {
    return this.repository.find({ car_id });
  }
}

/* -------------------------------------------------------------------------- */
export default RentalsRepository;
