import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/files/upload';
import UploadImageController from '@modules/cars/use-cases/car-images/upload-image/UploadImage.controller';
import CreateCarController from '@modules/cars/use-cases/car/create-car/CreateCar.controller';
import ListCarsController from '@modules/cars/use-cases/car/list-cars/listCars.controller';
import CreateCarSpecificationController from '@modules/cars/use-cases/specification/create-car-specification/CreateCarSpecification.controller';
import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

const carRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listCarsController = new ListCarsController();
const uploadImageControllers = new UploadImageController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

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

carRoutes.post(
  ':id/images',
  ensureAuthentication,
  ensureAdmin,
  upload.array('images'),
  uploadImageControllers.handle
);

carRoutes.get('/available', listCarsController.handle);

export default carRoutes;
