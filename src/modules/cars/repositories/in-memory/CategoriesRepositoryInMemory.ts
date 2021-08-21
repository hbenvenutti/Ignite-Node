import ICreateCategoryDTO from '@cars:dtos/ICreateCategoryDTO';
import Category from '@cars:entities/Category';
import ICategoriesRepository from '@cars:irepos/ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });

    this.categories.push(category);
  }
}

export default CategoriesRepositoryInMemory;
