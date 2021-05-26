import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IRequestDTO {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequestDTO): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (!categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryService;
