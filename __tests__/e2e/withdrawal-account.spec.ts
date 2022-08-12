import request from 'supertest';
import app from '../../src/app';

describe('Withdraw from Account', () => {
  beforeAll(async() => {
    await request(app).post('/api/accounts/new')
      .send({
        fullName: 'Tim Faray',
        email: 'timmy@mymail.com',
        securityPassKey: 'Kassw0rd',
        confirmSecurityPassKey: 'Kassw0rd',
      });

      await request(app).patch('/api/accounts/fund')
      .send({
        email: 'timmy@mymail.com',
        amount: 8000,
        securityPassKey: 'Kassw0rd',
      });
  });

  test('(PATCH) /api/accounts/withdraw - returns 200 status on successful withdrawal from an account',
    async () => {
      const res = await request(app).patch('/api/accounts/withdraw')
        .send({
          email: 'timmy@mymail.com',
          amount: 7000,
          securityPassKey: 'Kassw0rd',
        });

      expect(res.status).toEqual(200);
      expect(res.body.statusCode).toEqual(200);
      expect(res.body.message).toEqual(
        `Withdrawal successful! Your account with ID 'timmy@mymail.com' has been debited with 7000`
      );
      expect(res.body.account).toBeDefined();
      expect(res.body.account.previousBalance).toBeGreaterThan(res.body.account.newBalance);
    },
  );

  test('(PATCH) /api/accounts/withdraw - returns 400 status on withdrawal of 0 sum',
  async () => {
    const res = await request(app).patch('/api/accounts/withdraw')
      .send({
        email: 'test@test.com',
        amount: 0,
        securityPassKey: 'Passw0rd',
      });

    expect(res.status).toEqual(400);
    expect(res.body.errors).toBeDefined();
  },
);

  test('(PATCH) /api/accounts/withdraw - returns 400 with invalid email',
    async () => {
      const res = await request(app).patch('/api/accounts/withdraw')
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


  test('(PATCH) /api/accounts/withdraw - returns 400 with invalid password',
    async () => {
      const res = await request(app).patch('/api/accounts/withdraw')
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


  test('(PATCH) /api/accounts/withdraw - returns 400 with no email, password and amount',
    async () => {
      const res = await request(app).patch('/api/accounts/withdraw')
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


  test('(PATCH) /api/accounts/withdraw - disallow funding an inexistent account',
    async () => {
      const res = await request(app).patch('/api/accounts/withdraw')
        .send({
          email: 'noaccount@test.com',
          securityPassKey: 'Passw0rd',
          amount: 500,
        });

      expect(res.body.errors).toBeDefined();
    },
  );

  test('(PATCH) /api/accounts/withdraw - disallow withdrawal of amount greater than account balance',
  async () => {
    const res = await request(app).patch('/api/accounts/withdraw')
      .send({
        email: 'timmy@mymail.com',
        securityPassKey: 'Kassw0rd',
        amount: 90000,
      });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  },
);
});







