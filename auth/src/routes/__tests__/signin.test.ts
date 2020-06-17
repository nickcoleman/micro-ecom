import request from 'supertest';
import {app} from '../../app';
import {getUserAuthCookie} from '../../test/getUserAuthCookie';

const signinUri = '/api/users/signin';
const signupUri = '/api/users/signup';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post(signinUri)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post(signupUri)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post(signinUri)
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  const signupResponse = await request(app)
    .post(signupUri)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  const cookie = signupResponse.get('Set-Cookie');

  const response = await request(app)
    .post(signinUri)
    .set('Cookie', cookie)
    .send({
      email: 'test@test.com',
      password: 'password',
    });
  // .expect(200);

  // console.log('response status', response.status);
  // console.log('response header', response.header);
  // expect(response.get('Set-Cookie')).toBeDefined();
});

it('v2 using getUserAuth - responds with a cookie when given valid credentials', async () => {
  const cookie = await getUserAuthCookie();
  expect(cookie).toBeTruthy();

  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app).post(signinUri).send({
    email,
    password,
  });
  // .expect(200);

  // console.log('response status', response.status);
  // console.log('response header', response.header);
  // expect(response.get('Set-Cookie')).toBeDefined();
});
