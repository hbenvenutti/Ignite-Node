import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Category from './Category';
import Specification from './Specification';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  daily_rate: number;

  @Column()
  brand: string;

  @Column()
  available: boolean;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'cars_specifications',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
  specifications: Specification[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}

export default Car;
