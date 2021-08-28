import {
  Email,
  Token,
  UserId,
  VerifyResponse
} from 'modules/accounts/@types/credentials/credentials';

interface ITokenProvider {
  sign(id: UserId): Token;
  signRefresh(id: UserId, email: Email): Token;
  verifyToken(token: Token): UserId;
  verifyRefreshToken(token: Token): VerifyResponse;
}

export default ITokenProvider;
