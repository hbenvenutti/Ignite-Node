import Rental from '@modules/rental/infra/typeorm/entities/Rental';

import IRentalsRepository from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findByCar(carId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.car_id === carId && rental.end_date === null
    );
  }

  async findAllByCar(carId: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.car_id === carId);
  }

  async findByUser(userId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.user_id === userId && rental.end_date === null
    );
  }

  async findAllByUser(userId: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === userId);
  }
}

export default RentalsRepositoryInMemory;
