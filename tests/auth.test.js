const request = require('supertest');
const app = require('../app');
const db = require('../src/models');
const { insertDummy } = require('./registerDummy');

describe('Auth routes', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });

  describe('POST /auth/register', () => {
    test('should register new user', async () => {
      const user = {
        username: 'user',
      };
      // expect http status = 201 created
      await request(app).post('/auth/register').send(user).expect(201);

      // expect database user registered
      const registeredUser = await db.user.findOne({
        where: { username: user.username },
      });
      expect(registeredUser).toMatchObject(
        expect.objectContaining({
          id: expect.any(String),
          username: user.username,
          avatar: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });

    test('username already used', async () => {
      const user = {
        username: 'user',
      };
      await insertDummy();

      // expect status code 400
      const res = await request(app).post('/auth/register').send(user).expect(400);
      console.log(res.body);
      // expect response
      expect(res.body.errors).toMatchObject(
        expect.objectContaining({
          email: { message: 'email already used!' },
        })
      );
    });

    test('invalid input return 422', async () => {
      const user = {
        username: null,
      };

      // expect status code 422
      const res = await request(app).post('/auth/register').send(user).expect(422);

      // expect response
      expect(res.body.errors).toMatchObject(
        expect.objectContaining({
          username: { message: expect.any(String) },
        })
      );
    });
  });
});
