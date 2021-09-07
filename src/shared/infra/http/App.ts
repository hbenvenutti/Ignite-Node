import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import AppError from '@errors/AppError';
import router from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';

const swaggerDocument = YAML.load('./src/swagger.yml');

// ----------------------------------------------------------------------//
createConnection();

const app = express();

/* -------------------------------------------------------------------------- */

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`
  });
});

// ----------------------------------------------------------------------//

export default app;
