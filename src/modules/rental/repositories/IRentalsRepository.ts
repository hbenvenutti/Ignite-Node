import ICreateRentalDTO from '../dtos/ICreateRental';
import Rental from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;

  findByUser(userId: string): Promise<Rental | undefined>;
  findAllByUser(userId: string): Promise<Rental[]>;

  findByCar(carId: string): Promise<Rental | undefined>;
  findAllByCar(carId: string): Promise<Rental[]>;
}

export default IRentalsRepository;

