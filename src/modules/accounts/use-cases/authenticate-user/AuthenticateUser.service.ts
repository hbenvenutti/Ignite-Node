import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import AppError from '@errors/AppError';

/* -------------------------------------------------------------------------- */
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

/* -------------------------------------------------------------------------- */
@injectable()
class AuthenticateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RefreshTokensRepository')
    private refreshTokenRepository: IRefreshTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // *** User Validation *** //
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect Email or Password');
    }

    // *** Password Validation *** //
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect Email or Password');
    }

    // *** Token *** //
    const token = sign({}, 'MyPassword', {
      subject: user.id,
      expiresIn: '1d'
    });

    const tokenResponse = {
      user: { name: user.name, email },
      token
    };

    return tokenResponse;
  }
}

/* -------------------------------------------------------------------------- */
export default AuthenticateUser;
