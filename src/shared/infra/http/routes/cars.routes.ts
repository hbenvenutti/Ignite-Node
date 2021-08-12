import { Router } from 'express';

import CreateCarController from '@modules/cars/use-cases/create-car/CreateCarController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle,
);

export default carRoutes;
