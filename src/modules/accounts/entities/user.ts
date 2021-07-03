import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export default class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name?: string;

  @Column()
  username?: string;

  @Column()
  password?: string;

  @Column()
  email?: string;

  @Column()
  driver_license?: string;

  @Column()
  isAdmin?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    this.id = uuidv4();
  }
}
