'use strict';
const chai = require('chai');
const expect = chai.expect;
const Rocky = require('../lib');
let instance;

describe('Rocky Prototypes', () => {
  describe('Create Rockey instance', () => {
    before(() => {
      instance = new Rocky({
        url: 'http://google.com'
      });
    });
    it('Should have url', () => {
      expect(instance.getUrl()).to.be.eql('http://google.com');
    });
  });
  describe('Setting up method', () => {
    before(() => {
      instance.setMethod('put');
    });
    it('Should have have a put method', () => {
      expect(instance.getMethod()).to.be.eql('put');
    });
  });

  describe('Setting Header', () => {
    describe('When Headers is an object', () => {
      before(() => {
        instance.setHeaders({ 'User-Agent': 'request' });
      });
      it('Should set the header', () => {
        expect(instance.getHeaders()).to.be.an('object');
      });
      it('Should have all keys', () => {
        expect(instance.getHeaders()).to.have.all.keys('User-Agent');
      });
    });
    describe('When headers is an array', () => {
      before(() => {
        instance.setHeaders([
          {
            name: 'content-type',
            value: 'application/x-www-form-urlencoded'
          }
        ]);
      });
      it('Should set the headers', () => {
        expect(instance.getHeaders()).to.be.an('array');
      });
    });
  });

  // Query params
  describe('Settings Query Params', () => {
    before(() => {
      instance.setQueryParams({ userId: 1, followers: true });
    });
    it('Should set query params', () => {
      expect(instance.getQueryParams()).to.be.an('object');
    });
  });

  // formData
  describe('formData', () => {
    before(() => {
      instance.setFormData({ username: 'doron' });
    });
    it('Should be an object', () => {
      expect(instance.getFormData()).to.be.an('object');
    });
  });
});
