import { sign, verify } from 'jsonwebtoken';

import auth from '@config/auth/auth';

import ITokenProvider from '../ITokenProvider';

interface IPayload {
  sub: string;
  iat: number;
  exp: number;
}
class JWTProvider implements ITokenProvider {
  sign(id: string): string {
    return sign({}, auth.secret, {
      subject: id,
      expiresIn: auth.expiresIn
    });
  }

  signRefresh(id: string, email: string): string {
    return sign({ email }, auth.refreshSecret, {
      subject: id,
      expiresIn: auth.expiresRefresh
    });
  }

  verifyToken(token: string): string {
    const { sub: userId } = verify(token, auth.secret) as IPayload;
    return userId;
  }

  verifyRefreshToken(token: string): string {
    const { sub } = verify(token, auth.refreshSecret) as IPayload;

    return sub;
  }
}

export default JWTProvider;
