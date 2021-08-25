import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import ITokenProvider from '@accounts:container/provider/token-provider/ITokenProvider';
import IRefreshTokensRepository from '@accounts:irepos/IRefreshTokensRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import auth from '@config/auth/auth';
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
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // *** User Validation *** //
    const user = await this.usersRepository.findByEmail(email);
    const { refreshSecret } = auth;

    if (!user) {
      throw new AppError('Incorrect Email or Password');
    }

    // *** Password Validation *** //
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect Email or Password');
    }

    // *** Token *** //
    const token = this.tokenProvider.sign(user.id);

    const refreshToken = this.tokenProvider.signRefresh(user.id, email);

    await this.refreshTokensRepository.create({
      userId: user.id,
      token: refreshToken,
      expireDate: 
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
