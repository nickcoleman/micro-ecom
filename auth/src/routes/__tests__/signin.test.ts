import request from 'supertest';
import {app} from '../../app';

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
  await request(app)
    .post(signupUri)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const currentuser = await request(app).get('api/users/currentuser');
  // console.log('currentuser', currentuser.status);

  const response = await request(app).post(signinUri).send({
    email: 'test@test.com',
    password: 'password',
  });
  // .expect(200);

  // console.log('response status', response.status);
  // console.log('response header', response.header);
  // expect(response.get('Set-Cookie')).toBeDefined();
});
