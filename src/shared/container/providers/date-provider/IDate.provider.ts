interface IDateProvider {
  compare(initialDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  tomorrow(): Date;
}

export default IDateProvider;
