import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPassword from './ResetPassword.service';

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPassword = container.resolve(ResetPassword);

    await resetPassword.execute(String(token), password);

    return response.send();
  }
}

export default ResetPasswordController;
