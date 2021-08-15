import { Router } from 'express';

import CreateCarSpecificationController from '@modules/cars/use-cases/create-car-specification/CreateCarSpecification.controller';
import CreateCarController from '@modules/cars/use-cases/create-car/CreateCarController';
import ListCarsController from '@modules/cars/use-cases/list-cars/listCars.controller';
import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);

carRoutes.post(
  '/:id/specifications',
  ensureAuthentication,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.get('/available', listCarsController.handle);

export default carRoutes;
