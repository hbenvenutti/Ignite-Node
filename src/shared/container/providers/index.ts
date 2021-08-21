import { container } from 'tsyringe';

import IDateProvider from './date-provider/IDate.provider';
import DayJs from './date-provider/implementations/DayJs.provider';

// -------------------------------------------------------------------------- //

container.registerSingleton<IDateProvider>('DateProvider', DayJs);
