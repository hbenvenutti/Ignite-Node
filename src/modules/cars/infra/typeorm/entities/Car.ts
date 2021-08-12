import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

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

  category_id!: string;

  constructor() {
    this.id = uuidv4();
  }
}

export default Car;
