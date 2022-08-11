import request from 'supertest';
import app from '../../src/app';


describe('App test', () => {
  test('(GET) /', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({
      message: 'Hey there! Welcome to my Lendsqr test API solution'
    });
  });
});   





