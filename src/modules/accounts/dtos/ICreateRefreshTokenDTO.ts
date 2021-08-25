interface ICreateRefreshTokenDTO {
  userId: string;
  expireDate: Date;
  token: string;
}

export default ICreateRefreshTokenDTO;
