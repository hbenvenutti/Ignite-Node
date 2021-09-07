import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserProfile from './UserProfile.service';

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const userProfile = container.resolve(UserProfile);

    const user = await userProfile.execute(id);

    return response.json(user);
  }
}

export default UserProfileController;
