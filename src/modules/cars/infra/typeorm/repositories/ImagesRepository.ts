import { getRepository, Repository } from 'typeorm';

import Image from '@cars:entities/Image';
import IImagesRepository from '@cars:irepos/IImagesRepository';

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
