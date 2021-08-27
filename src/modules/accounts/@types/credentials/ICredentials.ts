import { Email, Name, Password, Uuid } from './credentials';

interface ICredentials {
  id: Uuid;
  name: Name;
  email: Email;
  password: Password;
}

export default ICredentials;
