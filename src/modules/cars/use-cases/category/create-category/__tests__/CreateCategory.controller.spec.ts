import request from 'supertest';

import app from '@shared/infra/http/App';

describe('Create Category Controller', () => {
  it('should create a new category', async () => {
    await request(app).post('/categories').expect(200);
  });
});
