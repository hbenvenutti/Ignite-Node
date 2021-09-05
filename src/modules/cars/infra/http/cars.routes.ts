import { Router } from 'express';
import multer from 'multer';

import UploadImageController from '@cars:cases/car-images/upload-image/UploadImage.controller';
import CreateCarController from '@cars:cases/car/create-car/CreateCar.controller';
import ListCarsController from '@cars:cases/car/list-cars/listCars.controller';
import CreateCarSpecificationController from '@cars:cases/specification/create-car-specification/CreateCarSpecification.controller';
import uploadConfig from '@config/files/upload';
import ensureAdmin from '@middlewares/ensureAdmin';
import ensureAuthentication from '@middlewares/ensureAuthentication';

const carRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listCarsController = new ListCarsController();
const uploadImageControllers = new UploadImageController();

const upload = multer(uploadConfig);

carRoutes.post('/', ensureAuthentication, ensureAdmin, createCarController.handle);

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
