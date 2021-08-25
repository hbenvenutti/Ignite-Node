import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';

import User from './User';

@Entity('refresh_token')
class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  token: string;

  @Column()
  expire_date: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default RefreshToken;
