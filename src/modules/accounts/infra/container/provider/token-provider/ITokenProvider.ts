import { VerifyResponse } from './@types/VerifyResponse';

interface ITokenProvider {
  sign(id: string): string;
  signRefresh(id: string, email: string): string;
  verifyToken(token: string): string;
  verifyRefreshToken(token: string): VerifyResponse;
}

export default ITokenProvider;
