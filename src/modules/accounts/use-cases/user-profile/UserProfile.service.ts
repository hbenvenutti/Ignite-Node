import UserMap from 'modules/accounts/mapper/UserMap';
import { inject, injectable } from 'tsyringe';

import IUserResponseDTO from '@accounts:dtos/IUserResponseDTO';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import AppError from '@errors/AppError';

@injectable()
class UserProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    return UserMap.toDTO(user);
  }
}

export default UserProfile;
