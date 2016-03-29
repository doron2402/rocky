'use strict';
const http = require('http');
const joi = require('joi');
const chai = require('chai');
const expect = chai.expect;
const Rocky = require('../');
const PORT = 3005;
const json = JSON.stringify({
  code: 'ok',
  status: 'YaY!',
  users: ['a','b']
});
const app = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(json);
});

describe('Rocky API Testing', function() {
  describe('Test', function() {
    const schema = {
      status: joi.string(),
      code: joi.string(),
      users: joi.array().items(joi.string())
    };
    const instance = new Rocky({
       method: 'get',
       url: `http://localhost:${PORT}/users`,
       schema
     });
    let error;
    let rockyResponse = null;
    before(function(done) {
      app.listen(PORT, () => {
        instance.validate((err, res) => {
          if (err) {
            error = err;
          }
          rockyResponse = res;
          done();
        });
      });
    });
    it('Error should be null', function() {
      expect(error).to.be.eql(undefined);
    });
    it('Should return status code 200', () => {
      expect(rockyResponse.response.statusCode).to.be.eql(200);
    });
    it('Should return status Message : `OK`', () => {
      expect(rockyResponse.response.statusMessage).to.be.eql('OK');
    });
    it('Shold return the joi object', () => {
      expect(rockyResponse.joi).to.be.an('object');
    });
  });
});
