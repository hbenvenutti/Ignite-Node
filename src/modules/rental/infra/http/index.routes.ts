import { Router } from 'express';

import rentalRoutes from './rental.routes';

const rentalRouter = Router();

rentalRouter.use('/', rentalRoutes);

export default rentalRouter;
