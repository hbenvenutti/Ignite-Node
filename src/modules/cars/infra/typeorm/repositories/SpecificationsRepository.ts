import { getRepository, Repository } from 'typeorm';

import ISpecificationsRepository, {
  ICreateSpecificationDTO
} from '@modules/cars/repositories/ISpecificationsRepository';

import Specification from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  findById(id: string): Promise<Specification | undefined> {
    return this.repository.findOne({ id });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name });
  }
}

export default SpecificationsRepository;
