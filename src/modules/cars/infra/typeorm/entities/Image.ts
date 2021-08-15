import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class Image {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Image;
