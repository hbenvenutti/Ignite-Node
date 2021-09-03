import { Name } from '../credentials/credentials';

export type PathToTemplate = string;

export type URL = string;

export type EmailBodyTemplate = PathToTemplate;

export type PasswordRecoveryTemplateVars = {
  name: Name;
  link: URL;
};
