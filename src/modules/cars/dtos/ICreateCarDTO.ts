export default interface ICreateCarDTO {
  name: string;
  description: string;
  license_plate: string;
  fine_amount: number;
  daily_rate: number;
  brand: string;
  category_id: string;
}
