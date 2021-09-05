import { inject, injectable } from 'tsyringe';

import User from '@accounts:entities/User';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import IStorageProvider from '@providers/storage-provider/IStorageProvider';

interface IRequestDTO {
  user_id: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatarFile }: IRequestDTO): Promise<void> {
    const user = (await this.usersRepository.findById(user_id)) as User;
    const directory = 'avatar';

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, directory);
    }

    await this.storageProvider.save(avatarFile, directory);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
