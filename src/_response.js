// dependencies
const logger = require('@obi-tec/logger-console');

/**
 * @param {import('express').Response} res 
 * @param {object} body
 * @param {Number} statusCode
 * @param {object} headers
 * @param {Number} cache
 * @returns {any}
 */
const _createResponse = (res, body, statusCode, headers, cache = 0) => {
  if (cache > 0) {
    res.setHeader('Cache-Control', `public, max-age=${cache}`);
  } else {
    res.setHeader('Cache-Control', 'public, max-age=0');
  }

  for (const key in headers) {
    if (Object.hasOwnProperty.call(headers, key)) {
      const value = headers[key];
      res.header(key, value);
    }
  }

  if (body) {
    return res.status(statusCode).json(body);
  }

  return res.status(statusCode);
};

/**
 * @param {import('express').Response} res 
 * @param {object} body
 * @param {Number} statusCode
 * @param {object} headers
 * @param {number} cache
 * @returns {any}
 */
module.exports.success = async (res, body = null, statusCode = 200, headers = null, cache = 0) => {
  return _createResponse(res, body, statusCode, headers, cache);
};

/**
 * @param {import('express').Response} res 
 * @param {object} error
 * @returns {any}
 */
module.exports.error = (res, error) => {
  logger.error('Error response', error);

  let statusCode  = error?.httpStatusCode || 500;
  const body = {};
  if (error.isAxiosError) {
    statusCode = error.response.status;
    body.code = error.response.data?.code || 500;
    body.message = error.response.data?.message || error.message;
  } else {
    body.code = error?.businessStatusCode || 'api_internal-error';
    body.message = error.message;
  }
  const headers = {};

  return _createResponse(res, body, statusCode, headers);
};
