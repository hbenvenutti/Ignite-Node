import { Router } from 'express';

import authenticationRoutes from './authentication.routes';
import passwordRoutes from './password.routes';
import usersRoutes from './users.routes';

const accountsRouter = Router();

accountsRouter.use('/users', usersRoutes);
accountsRouter.use('/sessions', authenticationRoutes);
accountsRouter.use('/password', passwordRoutes);

export default accountsRouter;
