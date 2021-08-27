import { sign, verify } from 'jsonwebtoken';
import { VerifyResponse } from 'modules/accounts/@types/credentials/credentials';

import auth from '@config/auth/auth';

import ITokenProvider from '../ITokenProvider';

interface IPayload {
  sub: string;
  iat: number;
  exp: number;

  email: string;
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

  verifyRefreshToken(token: string): VerifyResponse {
    const { sub: id, email } = verify(token, auth.refreshSecret) as IPayload;

    return { id, email };
  }
}

export default JWTProvider;
