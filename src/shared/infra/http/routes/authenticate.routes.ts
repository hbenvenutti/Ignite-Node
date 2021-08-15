import { Router } from 'express';

import AuthenticateUserController from '@modules/accounts/useCases/authenticate-user/AuthenticateUser.controller';

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateUserController.handle);

export default authenticateRoutes;
