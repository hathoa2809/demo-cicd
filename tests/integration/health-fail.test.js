jest.mock('../../src/db', () => ({
  query: jest.fn().mockRejectedValue(new Error('DB down'))
}));

const request = require('supertest');
const app = require('../../src/app');

describe('Health Check - DB fail', () => {
  it('should return 500 when DB is down', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('DOWN');
  });
});
