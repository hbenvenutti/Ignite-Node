import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/files/upload';
import CreateUserController from '@modules/accounts/useCases/create-user/CreateUser.controller';
import UpdateUserAvatarController from '@modules/accounts/useCases/update-user-avatar/UpdateUserAvatar.controller';

import ensureAuthentication from '../middlewares/ensureAuthentication';

const usersRouter = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRouter.post('/', createUserController.handle);
usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export default usersRouter;
