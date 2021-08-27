import { Router } from 'express';

import authenticationRoutes from './authentication.routes';
import usersRoutes from './users.routes';

const accountsRouter = Router();

accountsRouter.use('/users', usersRoutes);
accountsRouter.use('/sessions', authenticationRoutes);

export default accountsRouter;
