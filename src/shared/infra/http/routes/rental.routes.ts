import { Router } from 'express';

import ensureAuthentication from '@middlewares/ensureAuthentication';
import CreateRentalController from '@rental:cases/create-rental/CreateRental.controller';

/* -------------------------------------------------------------------------- */
const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

/* -------------------------------------------------------------------------- */
rentalRoutes.post('/', ensureAuthentication, createRentalController.handle);

/* -------------------------------------------------------------------------- */
export default rentalRoutes;
