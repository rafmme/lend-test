import request from 'supertest';
import app from '../../src/app';

describe('Fund Account', () => {
  beforeAll(async() => {
    await request(app).post('/api/accounts/new')
      .send({
        fullName: 'Test Tester',
        email: 'tester@test.com',
        securityPassKey: 'Passw1rd',
        confirmSecurityPassKey: 'Passw1rd',
      });
  });

  test('(PATCH) /api/accounts/fund - returns 200 status on successful funding of an account',
    async () => {
      const res = await request(app).patch('/api/accounts/fund')
        .send({
          email: 'tester@test.com',
          amount: 500,
          securityPassKey: 'Passw1rd',
        });

      expect(res.status).toEqual(200);
      expect(res.body.statusCode).toEqual(200);
      expect(res.body.message).toEqual(`Your account with ID 'tester@test.com' has been funded with 500`);
      expect(res.body.account).toBeDefined();
      expect(res.body.account.previousBalance).toBeLessThan(res.body.account.newBalance);
      expect(res.body.account.newBalance).toEqual(500);
    },
  );

  test('(PATCH) /api/accounts/fund - returns 400 status on funding account with 0 sum',
  async () => {
    const res = await request(app).patch('/api/accounts/fund')
      .send({
        email: 'test@test.com',
        amount: 0,
        securityPassKey: 'Passw0rd',
      });

    expect(res.status).toEqual(400);
    expect(res.body.errors).toBeDefined();
  },
);

  test('(PATCH) /api/accounts/fund - returns 400 with invalid email',
    async () => {
      const res = await request(app).patch('/api/accounts/fund')
        .send({
          email: 'testescom',
          amount: 500,
          securityPassKey: 'Passw0rd',
        });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        errors: [ { message: '"email" must be a valid email', field: 'email' } ]
      });
    },
  );


  test('(PATCH) /api/accounts/fund - returns 400 with invalid password',
    async () => {
      const res = await request(app).patch('/api/accounts/fund')
        .send({
          email: 'test@test.com',
          amount: 500,
          securityPassKey: 'Pasrd',
        });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        errors: [
          {
            message: '"securityPassKey" length must be at least 8 characters long',
            field: 'securityPassKey'
          },
          {
            message: '""securityPassKey"" must contain one uppercase letter, one lowecase letter and one digit',
            field: 'securityPassKey'
          }
        ]
      });
    },
  );


  test('(PATCH) /api/accounts/fund - returns 400 with no email, password and amount',
    async () => {
      const res = await request(app).patch('/api/accounts/fund')
        .send({});

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        errors: [
          { message: '"email" is required', field: 'email' },
          {
            message: '"securityPassKey" is required',
            field: 'securityPassKey'
          },
          { message: '"amount" is required', field: 'amount' }
        ]
      });
    },
  );


  test('(PATCH) /api/accounts/fund - disallow funding an inexistent account',
    async () => {
      const res = await request(app).patch('/api/accounts/fund')
        .send({
          email: 'noaccount@test.com',
          securityPassKey: 'Passw0rd',
          amount: 500,
        });

      expect(res.body.errors).toBeDefined();
    },
  );
});







