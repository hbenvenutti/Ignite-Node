import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';

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

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect Email or Password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect Email or Password');
    }

    const token = sign({}, 'minhasenha', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenResponse = {
      user: { name: user.name, email },
      token,
    };

    return tokenResponse;
  }
}

export default AuthenticateUserService;
