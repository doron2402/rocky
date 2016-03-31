'use strict';
const _ = require('lodash');
const joi = require('joi');
const request = require('request');

const Rocky = function Rocky(options) {
  this.url = options.url || null;
  this.headers = options.headers || {};
  this.body = options.body || null;
  this.response = options.response || null;
  this.schema = options.schema || null;
  this.qs = options.qs || undefined;
  this.formData = options.formData || undefined;
};

// URL
Rocky.prototype.setUrl = function (url) {
  if (url.indexOf('http') === -1) {
    throw new Error('Url must contains http or https');
  }
  this.url = url;
};

Rocky.prototype.getUrl = function () {
  return this.url;
};

// headers
Rocky.prototype.setHeaders = function (headers) {
  if (!_.isObject(headers)) {
    throw new Error('headers must be an Object or Array');
  }
  this.headers = headers;
};

Rocky.prototype.getHeaders = function () {
  return this.headers;
};

// body to submit
Rocky.prototype.setBody = function (body) {
  if (!_.isPlainObject(body)) {
    throw new Error('body must be an object');
  }
  this.body = body;
};

Rocky.prototype.getBody = function () {
  return this.body;
};

// method
Rocky.prototype.setMethod = function (method) {
  if (_.indexOf(['get', 'post', 'put', 'del'], method) !== -1) {
    this.method = method;
  } else {
    throw new Error('Unknown http method');
  }
};

Rocky.prototype.getMethod = function () {
  return this.method;
};

// JOI Schema
Rocky.prototype.setJoiSchema = function (schema) {
  this.schema = schema;
};

Rocky.prototype.getJoiSchema = function () {
  return this.schema;
};

// Query Params
Rocky.prototype.setQueryParams = function (qs) {
  this.qs = qs;
};

Rocky.prototype.getQueryParams = function () {
  return this.qs;
};

// Validate schema with response object
Rocky.prototype.validateObjectWithSchema = function (obj, callback) {
  if (!this.schema) {
    throw new Error('Can\'t validate no schema found');
  }
  const schema = this.schema;
  const result = joi.validate(obj, schema);
  if (_.isFunction(callback)) {
    return callback(result.error, result.value);
  }
  return result;
};

// post form data
Rocky.prototype.setFormData = function (formData) {
  if (!_.isPlainObject(formData)) {
    throw new Error('formData must be an object');
  }

  this.formData = formData;
};
Rocky.prototype.getFormData = function () {
  return this.formData;
};

Rocky.prototype.validate = function (callback) {
  const self = this;
  const method = this.method || 'get';
  const url = this.url;
  const headers = this.headers;
  let formData;
  if (method.toLowerCase() !== 'get') {
    formData = this.formData;
  }
  const qs = this.qs;
  request({ method, url, headers, qs, formData }, (error, response) => {
    // Error on request
    if (error) {
      if (_.isFunction(callback)) {
        return callback(error);
      }
      return Promise.reject(error);
    }

    const result = self.validateObjectWithSchema(response.body);
    // Validate response
    if (result.error) {
      if (_.isFunction(callback)) {
        return callback(result.error, { response, joi: result.value });
      }
    }

    if (_.isFunction(callback)) {
      return callback(result.error, { response, joi: result.value });
    }

    return Promise.resolve({ response, joi: result });
  });
};

module.exports = Rocky;

