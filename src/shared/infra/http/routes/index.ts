import { Router } from 'express';

import accountsRouter from '@accounts:routes/index.routes';
import carRouter from '@cars:routes/index.routes';
import rentalRouter from '@rental:routes/index.routes';

/* -------------------------------------------------------------------------- */
const router = Router();

/* -------------------------------------------------------------------------- */
router.use('/cars', carRouter);
router.use('/accounts', accountsRouter);
router.use('/rentals', rentalRouter);

/* -------------------------------------------------------------------------- */
export default router;
