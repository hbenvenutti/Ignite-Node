import IUserResponseDTO from '@accounts:dtos/IUserResponseDTO';
import User from '@accounts:entities/User';

class UserMap {
  static toDTO({ name, email, id, avatar, driver_license }: User): IUserResponseDTO {
    return { name, email, id, avatar, driver_license };
  }
}

export default UserMap;
