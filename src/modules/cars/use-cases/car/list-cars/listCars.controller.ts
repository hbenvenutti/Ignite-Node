import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCars from './listCars.service';

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, categoryId, name } = request.query;
    const listCars = container.resolve(ListCars);

    const cars = await listCars.execute({
      brand: brand as string,
      categoryId: categoryId as string,
      name: name as string,
    });

    return response.status(201).json(cars);
  }
}

export default ListCarsController;
