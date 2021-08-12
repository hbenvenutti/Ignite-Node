import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  license_plate!: string;

  @Column()
  fine_amount!: number;

  @Column()
  daily_rate!: number;

  @Column()
  brand!: string;

  @Column()
  available!: boolean;

  @Column()
  category_id!: string;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}

export default Car;
