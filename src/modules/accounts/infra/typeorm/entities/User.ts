import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export default class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = uuidv4();
  }
  // -------------------------------------------------------------------------------------------- //
  @Expose({ name: 'avatarUrl' })
  avatarUrl(): string | null {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.DEV_BASE_URL}/avatar/${this.avatar}`;

      case 'S3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;

      default:
        return null;
    }
  }
}
