import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from './CreateUserService';

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, username, driver_license } = request.body;
    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      username,
      password,
      driver_license,
      email,
    });

    return response.status(201).send();
  }
}
