import Specification from '../infra/typeorm/entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export default interface ISpecificationsRepository {
  create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification>;
  findById(id: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
}
