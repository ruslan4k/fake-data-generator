const request = require('supertest');
require('dotenv').config();
const { app } = require('../app');

it('returns a 200 with null in body for "user" property if user not logged in', async () => {
  const response = await request(app).get(`/users/me`).send();

  expect(response.status).toEqual(200);
  expect(response.body.user).toEqual(null);
});
