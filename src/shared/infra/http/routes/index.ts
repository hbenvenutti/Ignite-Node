import { Router } from 'express';

import authenticateRoutes from '@accounts:routes/authenticate.routes';
import usersRouter from '@accounts:routes/users.routes';
import carRouter from '@cars:routes/index.routes';

import rentalRoutes from './rental.routes';

/* -------------------------------------------------------------------------- */
const router = Router();

/* -------------------------------------------------------------------------- */
router.use('/cars', carRouter);
router.use('/users', usersRouter);
router.use('/sessions', authenticateRoutes);
router.use('/rentals', rentalRoutes);

/* -------------------------------------------------------------------------- */
export default router;
