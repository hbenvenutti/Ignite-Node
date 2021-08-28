import { sign, verify } from 'jsonwebtoken';
import {
  Email,
  Token,
  UserId,
  VerifyResponse
} from 'modules/accounts/@types/credentials/credentials';

import auth from '@config/auth/auth';

import ITokenProvider from '../ITokenProvider';

interface IPayload {
  sub: string;
  iat: number;
  exp: number;

  email: Email;
}

class JWTProvider implements ITokenProvider {
  sign(id: UserId): Token {
    return sign({}, auth.secret, {
      subject: id,
      expiresIn: auth.expiresIn
    });
  }

  signRefresh(id: UserId, email: Email): Token {
    return sign({ email }, auth.refreshSecret, {
      subject: id,
      expiresIn: auth.expiresRefresh
    });
  }

  verifyToken(token: string): UserId {
    const { sub: userId } = verify(token, auth.secret) as IPayload;
    return userId;
  }

  verifyRefreshToken(token: Token): VerifyResponse {
    const { sub: id, email } = verify(token, auth.refreshSecret) as IPayload;

    return { id, email };
  }
}

export default JWTProvider;
