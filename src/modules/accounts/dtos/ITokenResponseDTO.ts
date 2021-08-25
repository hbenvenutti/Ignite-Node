interface ITokenResponseDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
export default ITokenResponseDTO;
