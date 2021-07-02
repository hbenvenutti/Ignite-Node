import { Request, Response } from 'express';

import ImportCategoryService from './ImportCategoryService';

export default class ImportCategoryController {
  constructor(private importCategoryService: ImportCategoryService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    await this.importCategoryService.execute(file);

    return response.send();
  }
}
