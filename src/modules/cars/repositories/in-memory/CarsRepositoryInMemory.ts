import ICreateCarDTO from '@cars:dtos/ICreateCarDTO';
import IUpdateCarDTO from '@cars:dtos/IUpdateCarDTO';
import Car from '@cars:entities/Car';
import ICarsRepository from '@cars:irepos/ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const {
      name,
      description,
      category_id,
      license_plate,
      brand,
      daily_rate,
      fine_amount
    } = data;

    const car = new Car();

    Object.assign(car, {
      name,
      description,
      category_id,
      license_plate,
      brand,
      daily_rate,
      fine_amount
    });

    this.cars.push(car);

    return car;
  }

  async update(data: IUpdateCarDTO): Promise<Car> {
    const {
      id,
      name,
      description,
      category_id,
      license_plate,
      brand,
      daily_rate,
      fine_amount
    } = data;

    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      category_id,
      license_plate,
      brand,
      daily_rate,
      fine_amount
    });

    this.cars.push(car);

    return car;
  }

  async findAvailable(
    brand: string,
    categoryId: string,
    name: string
  ): Promise<Car[]> {
    const all = this.cars.filter(car => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (categoryId && car.category_id === categoryId) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });

    return all;

    /*
        const cars = this.cars
        .filter(car => car.available === true)
        .filter(car => data.brand && car.brand === data.brand)
        .filter(car => data.categoryId && car.category_id === data.categoryId)
        .filter(car => data.name && car.name === data.name);

        console.log('repository: ', cars);
        return cars;
        */
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async findByLicense(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.license_plate === licensePlate);
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const index = await this.cars.findIndex(car => car.id === id);

    this.cars[index].available = available;
  }
}

export default CarsRepositoryInMemory;
