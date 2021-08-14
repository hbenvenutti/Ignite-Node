import { Router } from 'express';

import CreateCarController from '@modules/cars/use-cases/create-car/CreateCarController';
import ListCarsController from '@modules/cars/use-cases/list-cars/listCars.controller';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle,
);

carRoutes.get('/available', listCarsController.handle);

export default carRoutes;
