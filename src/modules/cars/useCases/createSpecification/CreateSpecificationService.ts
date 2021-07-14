import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import ISpecificationsRepository from '../../repositories/ISpecificationsRepository';

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
    const specificationAlredyExists =
      this.specificationsRepository.findByName(name);

    if (!specificationAlredyExists) {
      throw new AppError(`Specification ${name} already exists`);
    }

    this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationService;
