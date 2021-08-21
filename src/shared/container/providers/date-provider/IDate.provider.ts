interface IDate {
  compare(initialDate: Date, endDate: Date): Promise<number>;
  convertToUTC(date: Date): Promise<string>;
}

export default IDate;
