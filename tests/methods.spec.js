'use strict';
const chai = require('chai');
const expect = chai.expect;
const Rocky = require('../');
let instance;
describe('Rocky Prototypes', function() {
  describe('Create Rockey instance', () => {
    before(() => {
      instance = new Rocky({url: 'http://google.com' });
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
    describe('When headers is a string', () => {
      it('Should throw a new error', () => {
        expect(instance.setHeaders('aaa')).to.throw();
        //s(new Error('headers must be an object'));
      });
    });
  });
});
