import IRentalsRepository from '@rental:irepos/IRentalsRepository';

interface IRequest {
  id: string;
}
class FinishRental {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute(data: IRequest): Promise<void> {
    const { id } = data;
  }
}

export default FinishRental;
