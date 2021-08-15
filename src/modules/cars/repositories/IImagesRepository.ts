import Image from '@modules/cars/infra/typeorm/entities/Image';

interface IImagesRepository {
  create(carId: string, name: string): Promise<Image>;
}

export default IImagesRepository;
