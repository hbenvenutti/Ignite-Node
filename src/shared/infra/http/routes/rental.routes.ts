import { Router } from 'express';

import ensureAuthentication from '@middlewares/ensureAuthentication';
import CreateRentalController from '@rental:cases/create-rental/CreateRental.controller';
import FinishRentalController from '@rental:cases/finish-rental/FinishRental.controller';

/* -------------------------------------------------------------------------- */
const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const finishRentalController = new FinishRentalController();

/* -------------------------------------------------------------------------- */
rentalRoutes.post('/', ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  '/finish/:id',
  ensureAuthentication,
  finishRentalController.handle
);

/* -------------------------------------------------------------------------- */
export default rentalRoutes;
