import ICreateCarDTO from '@cars:dtos/ICreateCarDTO';
import IUpdateCarDTO from '@cars:dtos/IUpdateCarDTO';
import Car from '@cars:entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;

  update(data: IUpdateCarDTO): Promise<Car>;

  updateAvailability(id: string, available: boolean): Promise<void>;

  findById(id: string): Promise<Car | undefined>;

  findByLicense(licensePlate: string): Promise<Car | undefined>;

  findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]>;
}

export default ICarsRepository;
