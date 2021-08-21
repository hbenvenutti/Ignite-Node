import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDate from '../IDate.provider';

dayjs.extend(utc);

class DayJs implements IDate {
  async compare(initialDate: Date, endDate: Date): Promise<number> {
    return dayjs(endDate).diff(dayjs(initialDate), 'hours');
  }

  async convertToUTC(date: Date): Promise<string> {
    return dayjs(date).utc().local().format();
  }
}

export default DayJs;
