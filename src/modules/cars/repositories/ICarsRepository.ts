import ICreateCarDTO from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicense(data: string): Promise<Car | undefined>;
}

export default ICarsRepository;
