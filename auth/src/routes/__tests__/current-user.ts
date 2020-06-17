import request from 'supertest';

import {app} from '../../app';
import {getUserAuthCookie} from '../../test/getUserAuthCookie';

const currentUserUri = '/api/users/currentuser';
const signupUri = '/api/users/signup';

it('responds with details about the current user', async () => {
  const email = 'test@test.com';
  const signupResponse = await request(app)
    .post(signupUri)
    .send({
      email,
      password: 'password',
    })
    .expect(201);
  const cookie = signupResponse.get('Set-Cookie');

  const response = await request(app)
    .get(currentUserUri)
    .set('Cookie', cookie)
    .send()
    .expect(200);
  const {currentUser} = response.body;
  expect(currentUser.email).toBe(email);
});

it('responds with details about the current user v2-with global sigin', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get(currentUserUri)
    .set('Cookie', cookie)
    .send()
    .expect(200);
  const {currentUser} = response.body;
  expect(currentUser.email).toBe('test@test.com');
});

it('responds with a null value if current user does not exisit', async () => {
  const response = await request(app).get(currentUserUri).send().expect(200);
  const {currentUser} = response.body;
  expect(currentUser).toBeNull();
});
