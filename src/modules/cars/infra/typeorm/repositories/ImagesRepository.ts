import { getRepository, Repository } from 'typeorm';

import IImagesRepository from '@modules/cars/repositories/IImagesRepository';

import Image from '../entities/Image';

class ImagesRepository implements IImagesRepository {
  private repository: Repository<Image>;

  constructor() {
    this.repository = getRepository(Image);
  }

  async create(carId: string, name: string): Promise<Image> {
    const image = this.repository.create({ car_id: carId, name });

    await this.repository.save(image);

    return image;
  }
}

export default ImagesRepository;
