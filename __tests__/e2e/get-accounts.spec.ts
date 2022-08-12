import request from 'supertest';
import app from '../../src/app';


describe('App test', () => {
  test('(GET) /api/accounts', async () => {
    const res = await request(app).get('/api/accounts');

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('List of all accounts on the app.');
  });
});   





