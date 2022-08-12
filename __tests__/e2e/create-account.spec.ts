import request from 'supertest';
import app from '../../src/app';

describe('Create Account', () => {
  test('(POST) /api/accounts/new - returns 201 status on creation of an account',
    async () => {
      const res = await request(app).post('/api/accounts/new')
        .send({
          fullName: 'test',
          email: 'test@test.com',
          securityPassKey: 'Passw0rd',
          confirmSecurityPassKey: 'Passw0rd'
        });

      expect(res.status).toEqual(201);
      expect(res.body.statusCode).toEqual(201);
      expect(res.body.user).toBeDefined();
      expect(res.body).toEqual({
        message: "New Account created for user 'test (test@test.com)'\nPlease keep your 'securityPassKey' safe.",
        statusCode: 201,
        user: {
          email: 'test@test.com',
          fullName: 'test',
          securityPassKey: 'Passw0rd',
        },
      });
    },
  );

  test('(POST) /api/accounts/new - returns 400 with invalid email',
    async () => {
      const res = await request(app).post('/api/accounts/new')
        .send({
          fullName: 'test',
          email: 'testescom',
          securityPassKey: 'Passw0rd',
          confirmSecurityPassKey: 'Passw0rd'
        });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        errors: [ { message: '"email" must be a valid email', field: 'email' } ]
      });
    },
  );


  test('(POST) /api/accounts/new - returns 400 with invalid password',
    async () => {
      const res = await request(app).post('/api/accounts/new')
        .send({
          fullName: 'test',
          email: 'test@esmail.com',
          securityPassKey: 'Pasrd',
          confirmSecurityPassKey: 'Pasrd'
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


  test('(POST) /api/accounts/new - returns 400 with no email and password',
    async () => {
      const res = await request(app).post('/api/accounts/new')
        .send({});

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        errors: [
          { message: '"email" is required', field: 'email' },
          { message: '"fullName" is required', field: 'fullName' },
          {
            message: '"securityPassKey" is required',
            field: 'securityPassKey'
          },
          {
            message: '"confirmSecurityPassKey" is required',
            field: 'confirmSecurityPassKey'
          }
        ]
      });
    },
  );


  test('(POST) /api/accounts/new - disallow creating account with duplicate email',
    async () => {
      const res = await request(app).post('/api/accounts/new')
        .send({
          fullName: 'test',
          email: 'test@test.com',
          securityPassKey: 'Passw0rd',
          confirmSecurityPassKey: 'Passw0rd'
        });

      expect(res.body.errors).toBeDefined();
    },
  );
});







