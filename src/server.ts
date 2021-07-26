import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import AppError from './errors/AppError';
import router from './routes';
import swaggerFile from './swagger.json';

// ----------------------------------------------------------------------//

const app = express();

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`,
  });
});

// ----------------------------------------------------------------------//

app.listen(3333, () => console.log('server is running on port 3333'));
