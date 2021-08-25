import { inject, injectable } from 'tsyringe';

import User from '@accounts:entities/User';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import deleteFile from '@utils/file';

interface IRequestDTO {
  user_id: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatarFile }: IRequestDTO): Promise<void> {
    const user = (await this.usersRepository.findById(user_id)) as User;

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
