import ICreateSpecificationDTO from '@cars:dtos/ICreateSpecificationDTO';
import Specification from '@cars:entities/Specification';

export default interface ISpecificationsRepository {
  create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification>;
  findById(id: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
}
