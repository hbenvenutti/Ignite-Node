import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarSpecification from './CreateCarSpecification.service';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specificationsId } = request.body;
    const createCarSpecification = container.resolve(CreateCarSpecification);

    const car = await createCarSpecification.execute({
      carId: id,
      specificationsId
    });

    return response.status(201).json(car);
  }
}

export default CreateCarSpecificationController;
