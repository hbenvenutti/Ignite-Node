interface IUserResponseDTO {
  name: string;
  email: string;
  id: string;
  avatar?: string;
  driver_license: string;
  avatarUrl(): string | null;
}

export default IUserResponseDTO;
