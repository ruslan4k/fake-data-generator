const request = require('supertest');
const { app } = require('../app');

it('returns a 200 with null in body for "user" property if user not logged in', async () => {
  const response = await request(app).get('/users/me').send();
  expect(response.status).toEqual(200);
  expect(response.body.user).toEqual(null);
});

// login

it('returns a 400 if password not provided when logging in', async () => {
  const response = await request(app).post('/users/login').send({ username: 'user@gmail.com' });
  expect(response.status).toEqual(400);
});

it('returns a 400 if username is not provided when logging in', async () => {
  const response = await request(app).post('/users/login').send({ password: 'GWeg@W#@3' });
  expect(response.status).toEqual(400);
});

it('returns a 404 if username and password are not valid when logging in', async () => {
  const response = await request(app).post('/users/login').send({ username: 'user@gmail.com', password: 'TGWegw#@432r23F2' });
  expect(response.status).toEqual(404);
});

// registration

it('returns a 200 if all parameters are valid when signing up', async () => {
  const response = await request(app)
    .post('/users')
    .send({ email: 'user@gmail.com', password: 'TGWegw#@432r23F2', name: 'test name' });
  expect(response.status).toEqual(200);
});

it("returns a 409 if trying to use email that's already in use when signing up", async () => {
  await request(app).post('/users').send({ email: 'user@gmail.com', password: 'TGWegw#@432r23F2', name: 'test name' });
  const response = await request(app)
    .post('/users')
    .send({ email: 'user@gmail.com', password: 'TGWegw#@432r23F2', name: 'test name' });
  expect(response.status).toEqual(409);
});
