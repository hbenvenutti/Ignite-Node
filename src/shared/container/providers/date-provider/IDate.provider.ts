interface IDateProvider {
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compare(initialDate: Date, endDate: Date): number;
  compareInDays(initialDate: Date, endDate: Date): number;
  expiredDate(expiration: Date): boolean;
  now(): Date;
  tomorrow(): Date;
}

export default IDateProvider;
