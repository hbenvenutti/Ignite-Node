import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCategories from './ListCategories.service';

export default class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategories);
    const categories = await listCategories.execute();

    return response.json(categories);
  }
}
