import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/use-cases/createSpecification/CreateSpecificationController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createSpecificationController.handle,
);

export default specificationsRoutes;
