export type Uuid = string;

export type UserId = Uuid;

export type Email = string;

export type Name = string;

export type Password = string;

export type Token = string;

export type TokenResponse = {
  user: {
    name: Name;
    email: Email;
  };
  token: Token;
};

type Credentials = {
  id: Uuid;
  name: Name;
  email: Email;
  password: Password;
};

export type VerifyResponse = Pick<Credentials, 'id' | 'email'>;

export type Login = Pick<Credentials, 'email' | 'password'>;
