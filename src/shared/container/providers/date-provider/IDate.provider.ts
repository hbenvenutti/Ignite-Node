interface IDateProvider {
  compare(initialDate: Date, endDate: Date): number;
  compareInDays(initialDate: Date, endDate: Date): number;
  now(): Date;
  tomorrow(): Date;
  // // convertToUTC(date: Date): string;
}

export default IDateProvider;
