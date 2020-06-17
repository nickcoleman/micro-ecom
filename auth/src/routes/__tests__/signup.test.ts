import request from 'supertest';

import {app} from '../../app';

const signupUri = '/api/users/signup';

describe('Routes: signup', () => {
  it('returns a 201 on successful signup ', async () => {
    return request(app)
      .post(signupUri)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('returns a 400 on invalid email', async () => {
    return request(app)
      .post(signupUri)
      .send({
        email: 'badEmail',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 on invalid password', async () => {
    return request(app)
      .post(signupUri)
      .send({
        email: 'test@test.com',
        password: 'x',
      })
      .expect(400);
  });

  it('returns a 400 with missing email and/or password ', async () => {
    await request(app)
      .post(signupUri)
      .send({
        email: '',
        password: 'password',
      })
      .expect(400);
    await request(app)
      .post(signupUri)
      .send({
        email: 'test@test.com',
        password: '',
      })
      .expect(400);
    await request(app).post(signupUri).send({}).expect(400);
  });

  it('should not allow duplicate emails', async () => {
    await request(app)
      .post(signupUri)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    await request(app)
      .post(signupUri)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });
});
