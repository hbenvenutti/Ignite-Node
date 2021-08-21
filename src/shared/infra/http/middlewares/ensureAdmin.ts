import { Request, Response, NextFunction } from 'express';

import AppError from '@errors/AppError';

export default async function ensureAdmin(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError('User is not admin');
  }

  next();
}
