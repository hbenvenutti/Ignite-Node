import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDateProvider from '@providers/date-provider/IDate.provider';

dayjs.extend(utc);

class DayJs implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  /**
   * Returns future date adding hours.
   * @param  hours  How many hours in the future.
   * @returns Date with n hours in future.
   */
  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  compare(initialDate: Date, endDate: Date): number {
    // ? In Hours
    const endDateUTC = this.convertToUTC(endDate);
    const initialDateUTC = this.convertToUTC(initialDate);

    return dayjs(endDateUTC).diff(dayjs(initialDateUTC), 'hours');
  }

  compareInDays(initialDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const initialDateUTC = this.convertToUTC(initialDate);

    return dayjs(endDateUTC).diff(dayjs(initialDateUTC), 'days');
  }

  expiredDate(expirationDate: Date): boolean {
    return dayjs().isAfter(expirationDate);
  }

  now(): Date {
    return dayjs().toDate();
  }

  // * ------------------------ Test Methods ------------------------------ * //
  tomorrow(): Date {
    return dayjs().add(1, 'day').toDate();
  }

  // *** -------------------- DayJs Exclusive --------------------------- *** //
  private convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export default DayJs;
