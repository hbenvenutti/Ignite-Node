import {
  Email,
  Name,
  Password,
  UserId
} from '../@types/credentials/credentials';

export default interface ICreateUserDTO {
  name: Name;
  password: Password;
  email: Email;
  driver_license: string;
  id?: UserId;
  avatar?: string;
}
