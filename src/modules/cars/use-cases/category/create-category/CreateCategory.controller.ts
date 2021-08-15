import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategory from './CreateCategory.service';

export default class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategory = container.resolve(CreateCategory);

    await createCategory.execute({ name, description });

    return response.status(201).send();
  }
}
