'use strict';
const http = require('http');
const joi = require('joi');
const chai = require('chai');
const expect = chai.expect;
const Rocky = require('../');
const PORT = 3005;
const json = JSON.stringify({
  code: 'ok',
  users: []
});
const app = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(json);
});

describe('Rocky API Testing', function() {
  before((done) => {
   app.listen(PORT, done);
  });
  after(() => {
    app.close();
  });
  describe('When Get request with Invalid Joi Schema', function() {
    const schema = {
      code: joi.string(),
      users: joi.string()
    };
    const instance = new Rocky({
       method: 'get',
       url: `http://localhost:${PORT}/users`,
       schema
     });
    let error;
    let rockyResponse = null;
    before(function(done) {
      instance.validate((err, res) => {
        if (err) {
          error = err;
        }
        rockyResponse = res;
        done();
      });
    });
    it('Error should NOT be null', function() {
      expect(error).to.not.be.eql(undefined);
    });
    it('Should return status code 200', () => {
      expect(rockyResponse.response.statusCode).to.be.eql(200);
    });
    it('Should return status Message : `OK`', () => {
      expect(rockyResponse.response.statusMessage).to.be.eql('OK');
    });
    it('Error should have the following keys', () => {
      expect(error).to.have.all.keys('isJoi','name','details', '_object', 'annotate');
    });
    it('When there\'s an Error response should not contains error', () => {
      expect(rockyResponse.joi.error).to.be.eql(undefined);
    });
  });
});
