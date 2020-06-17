import request from 'supertest';

import {app} from '../../app';

const signoutUri = '/api/users/signout';
const signupUri = '/api/users/signup';

it('clears cookie after signout', async () => {
  await request(app)
    .post(signupUri)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  const response = await request(app).post(signoutUri).expect(200);
  const cookie = response.get('Set-Cookie');
  expect(cookie[0]).toBe(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
