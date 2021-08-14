import Specification from '@modules/cars/infra/typeorm/entities/Specification';

import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);
  }

  async findById(id: string): Promise<Specification | undefined> {
    return this.specifications.find(specification => specification.id === id);
  }
  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }
}

export default SpecificationsRepositoryInMemory;
