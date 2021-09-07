import { classToClass } from 'class-transformer';

import IUserResponseDTO from '@accounts:dtos/IUserResponseDTO';
import User from '@accounts:entities/User';

class UserMap {
  static toDTO({ name, email, id, avatar, driver_license, avatarUrl }: User): IUserResponseDTO {
    const user = classToClass({
      name,
      email,
      id,
      avatar,
      driver_license,
      avatarUrl
    });

    return user;
  }
}

export default UserMap;
