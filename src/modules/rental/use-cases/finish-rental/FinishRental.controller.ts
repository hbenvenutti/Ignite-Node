import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FinishRental from './FinishRental.service';

class FinishRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;
    const finishRental = container.resolve(FinishRental);

    await finishRental.execute({ id, userId });

    return response.send();
  }
}

export default FinishRentalController;
