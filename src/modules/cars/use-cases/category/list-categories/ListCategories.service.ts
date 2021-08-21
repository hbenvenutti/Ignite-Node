import { inject, injectable } from 'tsyringe';

import Category from '@cars:entities/Category';
import ICategoriesRepository from '@cars:irepos/ICategoriesRepository';

@injectable()
export default class ListCategories {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
