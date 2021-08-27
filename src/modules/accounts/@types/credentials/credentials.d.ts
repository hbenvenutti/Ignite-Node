export type Uuid = string;

export type Email = string;

export type Name = string;

export type Password = string;

export type Token = string;

export type VerifyResponse = Pick<ICredentials, 'id', 'email'>;
