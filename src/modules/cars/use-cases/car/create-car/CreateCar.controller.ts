import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCar from './CreateCar.service';

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const createCar = container.resolve(CreateCar);

    const car = await createCar.execute(data);

    return res.status(201).json(car);
  }
}
export default CreateCarController;
