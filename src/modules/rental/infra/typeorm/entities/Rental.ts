import { v4 as uuidv4 } from 'uuid';

class Rental {
  id: string;
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.created_at = new Date();
      this.updated_at = new Date();
    }
  }
}

export default Rental;
