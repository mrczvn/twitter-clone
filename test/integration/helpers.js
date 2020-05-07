const supertest = require('supertest');
const chai = require('chai');
const path = require('path');

global.app = path.resolve(__dirname, '..', '..', 'src', 'app');
global.request = supertest(app);
global.expect = chai.expect;
