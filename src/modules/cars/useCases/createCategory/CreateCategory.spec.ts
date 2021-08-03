import AppError from '@errors/AppError';

import CategoriesRepositoryInMemory from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import CreateCategoryService from './CreateCategoryService';

let createCategoryService: CreateCategoryService;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoriesRepositoryInMemory,
    );
  });

  it('should create a new category', async () => {
    const category = {
      name: 'Test Category 2',
      description: 'Test Category Description',
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description,
    });

    const response = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(response).toHaveProperty('id');
  });

  it('should not create an existing category', async () => {
    expect(async () => {
      const category = {
        name: 'Test Category',
        description: 'Test Category Description',
      };

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
