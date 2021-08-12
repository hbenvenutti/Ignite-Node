import ICreateCarDTO from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByLicense(data: string): Promise<Car | undefined>;
}

export default ICarsRepository;
