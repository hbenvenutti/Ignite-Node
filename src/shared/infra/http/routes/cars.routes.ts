import { Router } from 'express';

import CreateCarController from '@modules/cars/use-cases/create-car/CreateCarController';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post('/', createCarController.handle);

export default carRoutes;
