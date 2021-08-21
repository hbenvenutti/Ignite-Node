import { inject, injectable } from 'tsyringe';

import ISpecificationsRepository from '@cars:irepos/ISpecificationsRepository';
import AppError from '@errors/AppError';

interface IRequestDTO {
  name: string;
  description: string;
}
@injectable()
class CreateSpecification {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  execute({ name, description }: IRequestDTO): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (!specificationAlreadyExists) {
      throw new AppError(`Specification ${name} already exists`);
    }

    this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecification;
