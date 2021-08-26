interface ICreateRefreshTokenDTO {
  userId: string;
  expirationDate: Date;
  token: string;
}

export default ICreateRefreshTokenDTO;
