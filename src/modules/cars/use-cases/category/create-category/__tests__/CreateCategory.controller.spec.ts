import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import app from '@shared/infra/http/App';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'adm171')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should create a new category', async () => {
    const session = await request(app)
      .post('/accounts/sessions')
      .send({ email: 'admin@rentx.com', password: 'admin' });

    const { refreshToken } = session.body;

    const response = await request(app)
      .post('/cars/categories')
      .send({ name: 'Supertest', description: 'supertest' })
      .set({ Authorization: `Bearer ${refreshToken}` });

    expect(response.status).toBe(201);
  });

  it('should not create a duplicate category', async () => {
    const session = await request(app)
      .post('/accounts/sessions')
      .send({ email: 'admin@rentx.com', password: 'admin' });

    const { refreshToken } = session.body;
    await request(app)
      .post('/cars/categories')
      .send({ name: 'Supertest', description: 'supertest' })
      .set({ Authorization: `Bearer ${refreshToken}` });

    const response = await request(app)
      .post('/cars/categories')
      .send({ name: 'Supertest', description: 'supertest' })
      .set({ Authorization: `Bearer ${refreshToken}` });

    expect(response.status).toBe(400);
  });
});
