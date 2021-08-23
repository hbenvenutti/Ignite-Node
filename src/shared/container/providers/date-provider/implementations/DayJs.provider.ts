import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDateProvider from '@providers/date-provider/IDate.provider';

dayjs.extend(utc);

class DayJs implements IDateProvider {
  compare(initialDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const initialDateUTC = this.convertToUTC(initialDate);

    return dayjs(endDateUTC).diff(dayjs(initialDateUTC), 'hours');
  }

  compareInDays(initialDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const initialDateUTC = this.convertToUTC(initialDate);

    return dayjs(endDateUTC).diff(dayjs(initialDateUTC), 'days');
  }

  now(): Date {
    return dayjs().toDate();
  }

  // *** ------------------------ DayJs Exclusive ----------------------- *** //
  private convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  // * ------------------------ Test Methods ------------------------------ * //
  tomorrow(): Date {
    return dayjs().add(1, 'day').toDate();
  }
}

export default DayJs;
