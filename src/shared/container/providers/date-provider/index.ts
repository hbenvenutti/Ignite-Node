import { container } from 'tsyringe';

import IDateProvider from './IDate.provider';
import DayJs from './implementations/DayJs.provider';

container.register<IDateProvider>('DateProvider', DayJs);
