import { inject, injectable } from 'tsyringe';

import IImagesRepository from '@cars:irepos/IImagesRepository';
import IStorageProvider from '@providers/storage-provider/IStorageProvider';

interface IRequest {
  carId: string;
  imagesNames: string[];
}

@injectable()
class UploadImage {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, imagesNames }: IRequest): Promise<void> {
    imagesNames.map(async name => {
      await this.imagesRepository.create(carId, name);
      await this.storageProvider.save(name, 'cars');
    });
  }
}

export default UploadImage;
