import { Request, Response } from 'express';

class UploadImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.send();
  }
}

export default UploadImageController;
