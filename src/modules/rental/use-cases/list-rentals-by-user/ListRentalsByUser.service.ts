import { inject, injectable } from 'tsyringe';

import Rental from '@rental:entities/Rental';
import IRentalsRepository from '@rental:irepos/IRentalsRepository';

@injectable()
class ListRentalsByUser {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(userId: string): Promise<Rental[]> {
    return this.rentalsRepository.findAllByUser(userId);
  }
}

export default ListRentalsByUser;
