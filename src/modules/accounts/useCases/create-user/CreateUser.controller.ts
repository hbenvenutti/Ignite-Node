import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUser from './CreateUser.service';

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;
    const createUser = container.resolve(CreateUser);

    await createUser.execute({
      name,
      password,
      driver_license,
      email
    });

    return response.status(201).send();
  }
}
