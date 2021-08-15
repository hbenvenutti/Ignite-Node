import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/use-cases/specification/create-specification/CreateSpecification.controller';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createSpecificationController.handle
);

export default specificationsRoutes;
