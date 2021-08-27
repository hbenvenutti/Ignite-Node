import { Uuid } from '../@types/credentials/credentials';

interface ICreateRefreshTokenDTO {
  userId: Uuid;
  expirationDate: Date;
  token: string;
}

export default ICreateRefreshTokenDTO;
