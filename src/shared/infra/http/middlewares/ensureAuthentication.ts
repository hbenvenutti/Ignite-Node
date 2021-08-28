import { NextFunction, Request, Response } from 'express';

import JWTProvider from '@accounts:container/provider/token-provider/implementations/JWTProvider';
import ITokenProvider from '@accounts:container/provider/token-provider/ITokenProvider';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import RefreshTokensRepository from '@accounts:repos/RefreshTokensRepository';
import UsersRepository from '@accounts:repos/UsersRepository';
import AppError from '@errors/AppError';

async function ensureAuthentication(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  // ! ------------------ On provider change -> JWTProvider --------------- ! //
  const tokenProvider: ITokenProvider = new JWTProvider();

  const authHeader = request.headers.authorization;

  // ------------------------------------------------------------------------ //

  // *** --------------------- Token Verification ----------------------- *** //

  if (!authHeader) {
    throw new AppError('Missing Token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { id: userId } = tokenProvider.verifyRefreshToken(token);

    // ! ------ On Repository Change -> Repository / import ---------- ! //
    const usersRepository: IUsersRepository = new UsersRepository();

    const refreshTokensRepository: IRefreshTokensRepository =
      new RefreshTokensRepository();

    // ---------------------------------------------------------------------- //

    const user = await usersRepository.findById(userId);
    const refreshToken = await refreshTokensRepository.findByUserIdAndToken(
      userId,
      token
    );

    if (!refreshToken) {
      throw new AppError('Token not found', 401);
    }

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
