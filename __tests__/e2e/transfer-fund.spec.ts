import request from 'supertest';
import app from '../../src/app';

describe('Transfer from Account', () => {
  beforeAll(async() => {
    await request(app).post('/api/accounts/new')
      .send({
        fullName: 'Tim Faray',
        email: 'timmy@test.com',
        securityPassKey: 'Passw1rd',
        confirmSecurityPassKey: 'Passw1rd',
      });

    await request(app).post('/api/accounts/new')
      .send({
        fullName: 'Ken Faray',
        email: 'ken@test.com',
        securityPassKey: 'Passw0rd',
        confirmSecurityPassKey: 'Passw0rd',
      });

    await request(app).patch('/api/accounts/fund')
      .send({
        email: 'timmy@test.com',
        amount: 8500,
        securityPassKey: 'Passw1rd',
      });
  });

  test('(PATCH) /api/accounts/transfer - returns 200 status on successful transfer',
    async () => {
      const res = await request(app).patch('/api/accounts/transfer')
        .send({
          sender: 'timmy@test.com',
          receipient: 'ken@test.com',
          amount: 500,
          securityPassKey: 'Passw1rd',
        });

      expect(res.status).toEqual(200);
      expect(res.body.statusCode).toEqual(200);
      expect(res.body.account).toBeDefined();
      expect(res.body.account.previousBalance).toBeGreaterThan(res.body.account.newBalance);
      expect(res.body.account.newBalance).toEqual(8000);
    },
  );

  test('(PATCH) /api/accounts/transfer - returns 400 status on transfer of 0 sum',
  async () => {
    const res = await request(app).patch('/api/accounts/transfer')
      .send({
        sender: 'timmy@test.com',
        receipient: 'ken@test.com',
        amount: 0,
        securityPassKey: 'Passw1rd',
      });

    expect(res.status).toEqual(400);
    expect(res.body.errors).toBeDefined();
  },
);

  test('(PATCH) /api/accounts/transfer - returns 400 with invalid email',
    async () => {
      const res = await request(app).patch('/api/accounts/transfer')
        .send({
          sender: 'testescom',
          receipient: 'tttttttmailer.com',
          amount: 500,
          securityPassKey: 'Passw0rd',
        });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        errors: [
          { message: '"sender" must be a valid email', field: 'sender' },
          { message: '"receipient" must be a valid email', field: 'receipient' },
        ]
      });
    },
  );


  test('(PATCH) /api/accounts/transfer - returns 400 with invalid password',
    async () => {
      const res = await request(app).patch('/api/accounts/transfer')
        .send({
          sender: 'timmy@test.com',
          receipient: 'ken@test.com',
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


  test('(PATCH) /api/accounts/transfer - returns 400 with empty data',
    async () => {
      const res = await request(app).patch('/api/accounts/transfer')
        .send({});

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        errors: [
          { message: '"sender" is required', field: 'sender' },
          { message: '"receipient" is required', field: 'receipient' },
          {
            message: '"securityPassKey" is required',
            field: 'securityPassKey'
          },
          { message: '"amount" is required', field: 'amount' }
        ]
      });
    },
  );


  test('(PATCH) /api/accounts/transfer - disallow transfer from an inexistent account',
    async () => {
      const res = await request(app).patch('/api/accounts/transfer')
        .send({
          sender: 'noaccount@test.com',
          receipient: 'timmy@test.com',
          securityPassKey: 'Passw0rd',
          amount: 500,
        });

      expect(res.body.errors).toBeDefined();
    },
  );

  test('(PATCH) /api/accounts/transfer - disallow transfer to an inexistent account',
  async () => {
    const res = await request(app).patch('/api/accounts/transfer')
      .send({
        sender: 'timmy@test.com',
        receipient: 'noaccount@test.com',
        securityPassKey: 'Passw1rd',
        amount: 500,
      });

    expect(res.body.errors).toBeDefined();
  },
);

  test('(PATCH) /api/accounts/transfer - disallow transfer of amount greater than account balance',
  async () => {
    const res = await request(app).patch('/api/accounts/transfer')
      .send({
        sender: 'timmy@test.com',
        receipient: 'ken@test.com',
        securityPassKey: 'Passw1rd',
        amount: 90000,
      });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  },
);

  test('(PATCH) /api/accounts/transfer - disallow transfer to same account',
  async () => {
    const res = await request(app).patch('/api/accounts/transfer')
      .send({
        sender: 'timmy@test.com',
        receipient: 'timmy@test.com',
        securityPassKey: 'Passw1rd',
        amount: 200,
      });

    expect(res.status).toBe(409);
    expect(res.body.errors).toBeDefined();
  },
);
});







