import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRefreshToken from './CreateRefreshToken.service';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] || // ? Learn why ? //
      request.query.token;

    const createRefreshToken = container.resolve(CreateRefreshToken);

    const refreshToken = await createRefreshToken.execute(token);

    return response.json(refreshToken);
  }
}

export default RefreshTokenController;
