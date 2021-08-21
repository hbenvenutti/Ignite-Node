import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRental from './CreateRental.service';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expectedReturnDate, carId } = request.body;
    const { id } = request.user;
    const createRental = container.resolve(CreateRental);

    const rental = await createRental.execute({
      carId,
      userId: id,
      expectedReturnDate
    });

    return response.status(201).json(rental);
  }
}

export default CreateRentalController;
