import { Token, UserId } from '../@types/credentials/credentials';

interface ICreateRefreshTokenDTO {
  userId: UserId;
  expirationDate: Date;
  token: Token;
}

export default ICreateRefreshTokenDTO;
