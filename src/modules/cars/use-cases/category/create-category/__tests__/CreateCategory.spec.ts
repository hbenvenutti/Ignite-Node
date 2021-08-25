import CategoriesRepositoryInMemory from '@cars:mocks/CategoriesRepositoryInMemory';
import AppError from '@errors/AppError';

import CreateCategory from '../CreateCategory.service';

let createCategoryService: CreateCategory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategory(categoriesRepositoryInMemory);
  });

  it('should create a new category', async () => {
    const category = {
      name: 'Test Category 2',
      description: 'Test Category Description'
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description
    });

    const response = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(response).toHaveProperty('id');
  });

  it('should not create a duplicate category', async () => {
    const category = {
      name: 'Test Category',
      description: 'Test Category Description'
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description
    });

    expect(async () => {
      await createCategoryService.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
