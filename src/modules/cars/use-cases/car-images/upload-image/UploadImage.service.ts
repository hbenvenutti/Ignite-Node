import { inject, injectable } from 'tsyringe';

import IImagesRepository from '@modules/cars/repositories/IImagesRepository';

interface IRequest {
  carId: string;
  imagesNames: string[];
}

@injectable()
class UploadImage {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository
  ) {}
  async execute({ carId, imagesNames }: IRequest): Promise<void> {
    imagesNames.map(async name => {
      await this.imagesRepository.create(carId, name);
    });
  }
}

export default UploadImage;
