import { Router } from 'express';

import SendPasswordEmailController from '@accounts:cases/send-password-email/SendPasswordEmail.controller';

const passwordRoutes = Router();
const sendPasswordEmailController = new SendPasswordEmailController();

passwordRoutes.post('/recover', sendPasswordEmailController.handle);

export default passwordRoutes;
