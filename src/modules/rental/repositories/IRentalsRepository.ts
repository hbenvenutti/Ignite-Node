import ICreateRentalDTO from '@rental:dtos/ICreateRental';
import Rental from '@rental:entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  finish(rental: Rental): Promise<void>;

  findById(id: string): Promise<Rental | undefined>;

  findByUser(userId: string): Promise<Rental | undefined>;
  findAllByUser(userId: string): Promise<Rental[]>;

  findByCar(carId: string): Promise<Rental | undefined>;
  findAllByCar(carId: string): Promise<Rental[]>;
}

export default IRentalsRepository;
