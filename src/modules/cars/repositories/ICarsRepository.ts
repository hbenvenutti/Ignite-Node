import ICreateCarDTO from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;

  findById(id: string): Promise<Car | undefined>;

  findByLicense(licensePlate: string): Promise<Car | undefined>;

  findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]>;
}

export default ICarsRepository;
