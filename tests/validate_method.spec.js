'use strict';
const chai = require('chai');
const expect = chai.expect;
const joi = require('joi');
const proxyquire = require('proxyquire');
let isCalledRequest = false;

const stub = {
  request: function request(options, callback) {
    isCalledRequest = true;
    const response = {
      body: {
        users: [
          { id: 1 },
          { id: 2 }
        ]
      }
    };
    callback(null, response);
  }
};
let instance;
const Rocky = proxyquire('../lib', stub);
describe.only('Validate method', () => {
  let response;
  let error;
  before(() => {
    instance = new Rocky({
      url: 'http://localhost:3000/users',
      method: 'get',
      qs: { userid: 1 },
      schema: {
        users: joi.array().items(joi.object())
      }
    });
    instance.validate((err, res) => {
      error = err;
      response = res;
    });
  });
  it('Should call request', () => {
    expect(isCalledRequest).to.be.eql(true);
  });
  it('Should not return an error', () => {
    expect(error).to.be.eql(null);
  });
  it('Should return joi object', () => {
    expect(response.joi).to.be.an('object');
  });
  it('response.joi should be eql to body', () => {
    expect(response.joi).to.have.all.keys('users');
    expect(response.joi.users[0]).to.be.eql({ id: 1 });
  });
});
