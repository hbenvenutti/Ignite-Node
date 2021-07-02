import { Request, Response } from 'express';

import ListCategoriesService from './ListCategoriesService';

export default class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesService.execute();

    return response.json(categories);
  }
}
