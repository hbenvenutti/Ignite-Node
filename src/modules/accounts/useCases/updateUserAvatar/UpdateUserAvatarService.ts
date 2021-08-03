import { inject, injectable } from 'tsyringe';

import User from '@modules/accounts/infra/typeorm/entities/user';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import deleteFile from '@utils/file';

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

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
