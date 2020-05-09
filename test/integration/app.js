import { expect } from 'chai';
import supertest from 'supertest';

import conn from '../../src/database';
import Users from '../../src/models/user';
import app from '../../src/app';

const request = supertest(app);

describe('Route /users', function () {
  const defaultUser = {
    id: 1,
    username: 'marvn',
    email: 'marcos@email.com',
    password: '1234',
  };

  this.beforeAll(async function () {
    return await conn.init();
  });

  this.beforeEach(async function () {
    await Users.destroy({ where: {} });
    await Users.create(defaultUser);
  });

  it('should return a list of users', function (done) {
    request.get('/users').end((err, res) => {
      const [user] = res.body;
      const { id, username, email } = user;
      expect(id).to.be.eql(defaultUser.id);
      expect(username).to.be.eql(defaultUser.username);
      expect(email).to.be.eql(defaultUser.email);
      expect(user).have.property('password');

      done(err);
    });
  });

  it('should return a user', function (done) {
    request.get('/users/1').end((err, res) => {
      const { id, username, email } = res.body;
      expect(id).to.eql(defaultUser.id);
      expect(username).to.be.eql(defaultUser.username);
      expect(email).to.be.eql(defaultUser.email);
      expect(res.body).have.property('password');

      done(err);
    });
  });

  it('should return a new user', function (done) {
    const newUser = {
      id: 2,
      username: 'mvrtr',
      email: 'vinicius@email.com',
      password: '1234',
    };
    request
      .post('/users')
      .send(newUser)
      .end((err, res) => {
        const { id, username, email } = res.body;
        expect(id).to.be.eq(newUser.id);
        expect(username).to.be.eql(newUser.username);
        expect(email).to.be.eql(newUser.email);
        expect(res.body).have.property('password');

        done(err);
      });
  });

  it('should update a user', function (done) {
    const updateUser = {
      username: 'mvrtr',
      email: 'vinicius@email.com',
      password: '1234',
    };
    request
      .put('/users/1')
      .send(updateUser)
      .end((err, res) => {
        expect(res.body).to.be.eql([1]);

        done(err);
      });
  });

  it('should delete a user', function (done) {
    request.delete('/users/1').end((err, res) => {
      expect(res.status).to.be.eql(204);
      done(err);
    });
  });

  it('should log a user', function (done) {
    const logUser = {
      id: 2,
      username: 'mvrtr',
      email: 'vinicius@email.com',
      password: '1234',
    };
    request
      .post('/signup')
      .send(logUser)
      .end((err, res) => {
        expect(res.body).have.property('token');
        expect(res.status).to.be.eql(201);
        done(err);
      });
  });

  it('should signin a user', function (done) {
    const { username, password } = defaultUser;
    request
      .get('/signin')
      .auth(username, password)
      .end((err, res) => {
        expect(res.body).have.property('token');
        expect(res.status).to.be.eql(200);
        done(err);
      });
  });
});
