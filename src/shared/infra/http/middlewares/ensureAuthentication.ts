import { NextFunction, Request, Response } from 'express';

import JWTProvider from '@accounts:container/provider/token-provider/implementations/JWTProvider';
import ITokenProvider from '@accounts:container/provider/token-provider/ITokenProvider';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import UsersRepository from '@accounts:repos/UsersRepository';
import AppError from '@errors/AppError';

async function ensureAuthentication(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  // ! ------------------ On provider change -> JWTProvider ----------------------------------- ! //
  const tokenProvider: ITokenProvider = new JWTProvider();

  const authHeader = request.headers.authorization;

  // *** --------------------- Token Verification ------------------------------------------- *** //

  if (!authHeader) {
    throw new AppError('Missing Token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const userId = tokenProvider.verifyToken(token);

    // ! ------ On Repository Change -> Repository / import ----------------------------------- ! //
    const usersRepository: IUsersRepository = new UsersRepository();

    // ------------------------------------------------------------------------------------------ //

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    request.user = {
      id: user.id,
      isAdmin: user.isAdmin
    };

    next();
  } catch {
    throw new AppError('invalid token', 401);
  }
}

export default ensureAuthentication;
