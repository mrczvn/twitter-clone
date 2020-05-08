import { expect } from 'chai';
import supertest from 'supertest';

import conn from '../../src/database';
import Users from '../../src/models/user';
import app from '../../src/app';

const request = supertest(app);

describe('Route GET /users', function () {
  // this.timeout(Infinity);

  const defaultUser = {
    id: 1,
    username: 'marvn',
    email: 'marcos@email.com',
    password: '1234',
  };

  this.beforeAll(async function () {
    return await conn.init();
  });

  this.beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done();
      });
  });

  it('should return a list of users', function (done) {
    request.get('/users').end((err, res) => {
      const body = res.body;
      console.log(body);
      expect(body[0].id).to.be.eql(defaultUser.id);
      expect(body[0].username).to.be.eql(defaultUser.username);
      expect(body[0].email).to.be.eql(defaultUser.email);
      expect(body[0].password).to.be.eql(defaultUser.password);

      done(err);
    });
  });
});
