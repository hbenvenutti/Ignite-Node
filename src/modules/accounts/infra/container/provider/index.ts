import { container } from 'tsyringe';

import JWTProvider from './token-provider/implementations/JWTProvider';
import ITokenProvider from './token-provider/ITokenProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTProvider);
