import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@modules/rental/dtos/ICreateRental';
import IRentalsRepository from '@modules/rental/repositories/IRentalsRepository';

import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  /* ----------------------- Methods ---------------------------------------- */
  create(data: ICreateRentalDTO): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
  findByUser(userId: string): Promise<Rental | undefined> {
    throw new Error('Method not implemented.');
  }
  findAllByUser(userId: string): Promise<Rental[]> {
    throw new Error('Method not implemented.');
  }
  findByCar(carId: string): Promise<Rental | undefined> {
    throw new Error('Method not implemented.');
  }
  findAllByCar(carId: string): Promise<Rental[]> {
    throw new Error('Method not implemented.');
  }
}

/* -------------------------------------------------------------------------- */
export default RentalsRepository;
