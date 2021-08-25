import { sign } from 'jsonwebtoken';

import auth from '@config/auth/auth';

import ITokenProvider from '../ITokenProvider';

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
}

export default JWTProvider;
