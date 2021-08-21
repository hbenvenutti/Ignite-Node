import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/use-cases/category/create-category/CreateCategory.controller';
import ImportCategoryController from '@modules/cars/use-cases/category/import-category/ImportCategory.controller';
import ListCategoriesController from '@modules/cars/use-cases/category/list-categories/ListCategories.controller';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthentication from '../middlewares/ensureAuthentication';

/* -------------------------------------------------------------------------- */
const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

/* -------------------------------------------------------------------------- */
categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCategoryController.handle
);

// *** CSV File Import */
categoriesRoutes.post(
  '/import',
  ensureAuthentication,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
);

/* -------------------------------------------------------------------------- */
export default categoriesRoutes;
