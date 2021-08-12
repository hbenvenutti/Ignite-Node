import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCar from './CreateCar.service';

async function CreateCarController(
  req: Request,
  res: Response,
): Promise<Response> {
  const data = req.body;
  const createCar = container.resolve(CreateCar);

  await createCar.execute(data);

  return res.send();
}

export default CreateCarController;
