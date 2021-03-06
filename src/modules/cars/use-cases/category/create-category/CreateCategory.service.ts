import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@cars:irepos/ICategoriesRepository';
import AppError from '@errors/AppError';

interface IRequestDTO {
  name: string;
  description: string;
}

@injectable()
class CreateCategory {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequestDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategory;
