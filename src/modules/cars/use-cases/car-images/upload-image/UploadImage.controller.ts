import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadImage from './UploadImage.service';

interface IFile {
  filename: string;
}

class UploadImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];
    const uploadImage = container.resolve(UploadImage);

    const names = images.map(file => file.filename);

    await uploadImage.execute({ carId: id, imagesNames: names });
    return response.status(201).send();
  }
}

export default UploadImageController;
