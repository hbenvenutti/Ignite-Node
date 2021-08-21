import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatar from './UpdateUserAvatar.service';

export default class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarFile = req.file.filename;

    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    await updateUserAvatar.execute({ user_id: id, avatarFile });

    return res.status(204).send();
  }
}
