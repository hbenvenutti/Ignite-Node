import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@rental:dtos/ICreateRental';
import Rental from '@rental:entities/Rental';
import IRentalsRepository from '@rental:irepos/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  // *** ------------------------ Methods ------------------------------- *** */

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

  async finish(rental: Rental): Promise<void> {
    await this.repository.save(rental);
  }

  // *** ---------------------  Find ------------------------------------ *** */
  async findById(id: string): Promise<Rental | undefined> {
    return this.repository.findOne(id);
  }

  // *** --------------------- By User ---------------------------------- *** */
  async findByUser(user_id: string): Promise<Rental | undefined> {
    return this.repository.findOne({ where: { user_id, endDate: null } });
  }

  async findAllByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({ user_id });
  }

  // *** --------------------- By Car ----------------------------------- *** */
  async findByCar(car_id: string): Promise<Rental | undefined> {
    return this.repository.findOne({ where: { car_id, endDate: null } });
  }

  async findAllByCar(car_id: string): Promise<Rental[]> {
    return this.repository.find({ car_id });
  }
}

/* -------------------------------------------------------------------------- */
export default RentalsRepository;
