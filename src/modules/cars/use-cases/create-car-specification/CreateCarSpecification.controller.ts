import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarSpecification from './CreateCarSpecification.service';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecification = container.resolve(CreateCarSpecification);

    await createCarSpecification.execute();

    return response.status(201).send();
  }
}

export default CreateCarSpecificationController;
