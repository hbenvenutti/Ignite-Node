import Specification from '@cars:entities/Specification';

export default interface IUpdateCarDTO {
  id: string;
  category_id: string;
  specifications: Specification[];
  brand: string;
  daily_rate: number;
  description: string;
  fine_amount: number;
  license_plate: string;
  name: string;
}
