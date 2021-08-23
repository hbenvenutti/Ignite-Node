import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FinishRental from './FinishRental.service';

class FinishRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const finishRental = container.resolve(FinishRental);

    const rental = await finishRental.execute({ id });

    return response.status(200).json(rental);
  }
}

export default FinishRentalController;
