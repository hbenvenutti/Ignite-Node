import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListRentalsByUser from './ListRentalsByUser.service';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listRentals = container.resolve(ListRentalsByUser);

    const rentals = await listRentals.execute(id);

    return response.json(rentals);
  }
}

export default ListRentalsByUserController;
