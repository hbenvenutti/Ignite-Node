interface IDateProvider {
  compare(initialDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  tomorrow(): Date;
  now(): Date;
}

export default IDateProvider;
