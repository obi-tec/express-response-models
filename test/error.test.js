const { it, expect, describe } = require('@jest/globals');
const ErrorHttp                = require('../src/_error');

describe('Error test suit case', () => {
  it('should create an instance of ErrorHttp without raising any errors', () => {
    expect(() => {
      new ErrorHttp('Test message', 200, 'BSC001');
    }).not.toThrow();
  });

  it('should return the same attributes passed to the constructor', () => {
    const errorMessage = 'Test message';
    const httpStatusCode = 200;
    const businessStatusCode = 'BSC001';
    const error = new ErrorHttp(errorMessage, httpStatusCode, businessStatusCode);

    expect(error.message).toBe(errorMessage);
    expect(error.httpStatusCode).toBe(httpStatusCode);
    expect(error.businessStatusCode).toBe(businessStatusCode);
  });

  it('should raise an error when httpStatusCode is not passed', () => {
    expect(() => {
      new ErrorHttp('Test message', undefined, '123');
    }).toThrow();
  });

  it('should raise an error when businessStatusCode is not passed', () => {
    expect(() => {
      new ErrorHttp('Test message', 200, undefined);
    }).toThrow();
  });

  it('should raise an error when httpStatusCode is invalid', () => {
    expect(() => {
      new ErrorHttp('Test message', 999, 'BSC001');
    }).toThrow();
  });

  it('should add original error', () => {
    expect(() => {
      new ErrorHttp('Test message', 201, 'BSC001', {name: 'original-error', message: 'message-error'});
    }).not.toThrow();
  });
});