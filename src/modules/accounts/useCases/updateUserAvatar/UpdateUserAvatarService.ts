import { inject, injectable } from 'tsyringe';

import User from '../../entities/user';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ user_id, avatarFile }: IRequestDTO): Promise<void> {
    const user = (await this.usersRepository.findById(user_id)) as User;

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
