import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import carRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import rentalRoutes from './rental.routes';
import specificationsRoutes from './specifications.routes';
import usersRouter from './users.routes';

/* -------------------------------------------------------------------------- */
const router = Router();

/* -------------------------------------------------------------------------- */
router.use('/cars', carRoutes);
router.use('/categories', categoriesRoutes);
router.use('/users', usersRouter);
router.use('/sessions', authenticateRoutes);
router.use('/rentals', rentalRoutes);
router.use('/specifications', specificationsRoutes);

/* -------------------------------------------------------------------------- */
export default router;
