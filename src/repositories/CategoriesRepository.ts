import Category from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description });
  }
  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): boolean {
    const category = this.categories.some(category => category.name === name);

    return category;
  }
}

export default CategoriesRepository;
