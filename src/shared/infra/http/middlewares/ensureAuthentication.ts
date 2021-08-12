import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing Token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'minhasenha') as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    req.user = {
      id: user.id,
      isAdmin: user.isAdmin,
    };

    next();
  } catch {
    throw new AppError('invalid token', 401);
  }
}
