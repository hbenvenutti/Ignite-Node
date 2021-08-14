import Specification from '../infra/typeorm/entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export default interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findById(id: string): Promise<Specification | undefined>;
  findByName(name: string): Promise<Specification | undefined>;
}
