import { Router } from 'express';

import AuthenticateUserController from '@accounts:cases/authenticate-user/AuthenticateUser.controller';

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateUserController.handle);

export default authenticateRoutes;
