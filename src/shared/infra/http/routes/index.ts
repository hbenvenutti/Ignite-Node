import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import carRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/cars', carRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRouter);
router.use('/sessions', authenticateRoutes);

export default router;
