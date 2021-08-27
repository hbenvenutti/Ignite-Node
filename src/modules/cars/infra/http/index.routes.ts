import { Router } from 'express';

import carRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';

const carRouter = Router();

carRouter.use('/', carRoutes);
carRouter.use('/categories', categoriesRoutes);
carRouter.use('/specifications', specificationsRoutes);

export default carRouter;
