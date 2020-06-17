import request from 'supertest';
import {app} from '../../app';

import {getUserAuthCookie} from '../../test/getUserAuthCookie';

const currentUserUri = '/api/users/currentuser';

it('responds with details about the current user', async () => {
  const cookie = await getUserAuthCookie();

  const response = await request(app)
    .get(currentUserUri)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app).get(currentUserUri).send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
