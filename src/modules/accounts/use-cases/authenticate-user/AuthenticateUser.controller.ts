import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUser from '@accounts:cases/authenticate-user/AuthenticateUser.service';

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUser);

    const authenticationInfo = await authenticateUser.execute({
      email,
      password
    });

    return res.json(authenticationInfo);
  }
}

export default AuthenticateUserController;
