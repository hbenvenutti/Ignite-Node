import { inject, injectable } from 'tsyringe';

import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
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

export default CreateSpecificationService;
