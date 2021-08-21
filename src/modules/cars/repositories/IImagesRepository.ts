import Image from '@cars:entities/Image';

interface IImagesRepository {
  create(carId: string, name: string): Promise<Image>;
}

export default IImagesRepository;
