import Specification from '../models/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export default interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}
