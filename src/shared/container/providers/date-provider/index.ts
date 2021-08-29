import { container } from 'tsyringe';

import IDateProvider from './IDate.provider';
import DayJs from './implementations/DayJs.provider';

container.registerSingleton<IDateProvider>('DateProvider', DayJs);
