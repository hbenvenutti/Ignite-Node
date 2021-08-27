import { Router } from 'express';

import AuthenticateUserController from '@accounts:cases/authenticate-user/AuthenticateUser.controller';

const authenticationRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post('/', authenticateUserController.handle);

export default authenticationRoutes;
