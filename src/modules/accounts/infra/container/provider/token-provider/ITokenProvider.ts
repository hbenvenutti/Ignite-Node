interface ITokenProvider {
  sign(id: string): string;
  signRefresh(id: string, email: string): string;
}

export default ITokenProvider;
