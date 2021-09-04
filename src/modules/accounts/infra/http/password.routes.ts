import { Router } from 'express';

import ResetPasswordController from '@accounts:cases/reset-password/ResetPassword.controller';
import SendPasswordEmailController from '@accounts:cases/send-password-email/SendPasswordEmail.controller';

const passwordRoutes = Router();
const sendPasswordEmailController = new SendPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/recover', sendPasswordEmailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export default passwordRoutes;
