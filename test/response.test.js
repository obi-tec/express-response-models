const { it, expect, describe, jest } = require('@jest/globals');
const {success, error}         = require('../src/_response');

describe('Response success test suit case', () => {
  it('should return a response with status code 200 and empty body when no arguments are passed', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res)
    };

    success(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.setHeader).toHaveBeenCalledTimes(1);
  });

  it('should return a response with the given status code and body when passed as arguments', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res)
    };

    const body = { message: 'Success' };
    const statusCode = 201;

    success(res, body, statusCode);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith(body);
    expect(res.setHeader).toHaveBeenCalledTimes(1);
  });

  it('should set the Cache-Control header to \'public, max-age=0\' when cache argument is not passed', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res)
    };

    success(res);

    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'public, max-age=0');
  });

  it('should return a response with status code 200 and empty body when body argument is null', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res)
    };

    success(res, null);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should create headers', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res),
      header    : jest.fn()
    };

    success(res, null, 200, {'Authorization': '123'});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should create cache', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res),
      header    : jest.fn()
    };
    const cache = 10;

    success(res, null, 200, null, 10);

    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', `public, max-age=${cache}`);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});

describe('Response error test suit case', () => {
  it('should return the response with the provided status code and body', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res)
    };
    const errorBody = {
      httpStatusCode     : 400,
      businessStatusCode : 'api_bad-request',
      message            : 'Bad request'
    };

    error(res, errorBody);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code    : 'api_bad-request',
      message : 'Bad request'
    });
  });

  it('should return the response with the provided status code, body and preserve body', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res)
    };

    const statusCode = 400;
    const errorBody = {
      isAxiosError       : true,
      httpStatusCode     : statusCode,
      businessStatusCode : 'api_bad-request',
      message            : 'Bad request',
      response           : {
        status : statusCode,
        data   : {
          key: 'value'
        }
      }
    };

    error(res, errorBody, true);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code    : 500,
      message : 'Bad request',
      ...errorBody.response.data
    });
  });

  it('should return the response with the provided status code, body and preserve body - part 2', () => {
    const res = {
      status    : jest.fn().mockImplementation(() => res),
      json      : jest.fn().mockImplementation(() => res),
      setHeader : jest.fn().mockImplementation(() => res),
      send      : jest.fn().mockImplementation(() => res)
    };

    const statusCode = 500;
    const errorBody = {
      message  : 'Bad request',
      response : {
        status: statusCode
      }
    };

    error(res, errorBody, true);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      code    : 'api_internal-error',
      message : 'Bad request'
    });
  });

});