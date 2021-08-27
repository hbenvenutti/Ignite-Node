import { Router } from 'express';

import ensureAuthentication from '@middlewares/ensureAuthentication';
import CreateRentalController from '@rental:cases/create-rental/CreateRental.controller';
import FinishRentalController from '@rental:cases/finish-rental/FinishRental.controller';
import ListRentalsByUserController from '@rental:cases/list-rentals-by-user/ListRentalsByUser.controller';

/* -------------------------------------------------------------------------- */
const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const finishRentalController = new FinishRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
/* -------------------------------------------------------------------------- */
rentalRoutes.post('/', ensureAuthentication, createRentalController.handle);

rentalRoutes.post(
  '/finish/:id',
  ensureAuthentication,
  finishRentalController.handle
);

rentalRoutes.get(
  '/user',
  ensureAuthentication,
  listRentalsByUserController.handle
);

/* -------------------------------------------------------------------------- */
export default rentalRoutes;
