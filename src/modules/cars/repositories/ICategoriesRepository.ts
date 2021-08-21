import ICreateCategoryDTO from '@cars:dtos/ICreateCategoryDTO';
import Category from '@cars:entities/Category';

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export default ICategoriesRepository;
