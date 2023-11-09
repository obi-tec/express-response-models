const { it, expect, describe } = require('@jest/globals');
const { ErrorHttp, response }        = require('../src/index');

describe('Error test suit case - index', () => {
  it('should create an instance of ErrorHttp without raising any errors', () => {
    expect(() => {
      new ErrorHttp('Test message', 200, 'BSC001');
    }).not.toThrow();
  });
});

describe('Response test suit case - index', () => {
  it('should verify if functions are available on import', async () => {
    expect(response.error).toEqual(expect.any(Function));
    expect(response.success).toEqual(expect.any(Function));
  });
});