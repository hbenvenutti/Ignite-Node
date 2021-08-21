import ICreateSpecificationDTO from '@cars:dtos/ICreateSpecificationDTO';
import Specification from '@cars:entities/Specification';
import ISpecificationsRepository from '@cars:irepos/ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  async findById(id: string): Promise<Specification | undefined> {
    return this.specifications.find(specification => specification.id === id);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(specification =>
      ids.includes(specification.id)
    );

    return specifications;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      specification => specification.name === name
    );
  }
}

export default SpecificationsRepositoryInMemory;
