import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

interface IRequestDTO {
  name: string;
  description: string;
}
class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequestDTO): void {
    const specificationAlredyExists =
      this.specificationsRepository.findByName(name);

    if (!specificationAlredyExists) {
      throw new Error(`Specification ${name} already exists`);
    }

    this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationService;
