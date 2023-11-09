const http = require('http');

class ErrorHttp extends Error {
  constructor(message, httpStatusCode, businessStatusCode, originalError = null) {
    super(message);
    if (typeof http.STATUS_CODES[httpStatusCode] === 'undefined') {
      throw Error('Express response models - Error HTTP: The http status code sent is invalid');
    }

    if (!businessStatusCode) {
      throw Error('Express response models - Error HTTP: Business status code is required');
    }

    this.name = 'ErrorHttp';
    this.httpStatusCode = httpStatusCode;
    this.businessStatusCode = businessStatusCode;
    if (originalError) {
      this.originalError = {
        name    : originalError.name,
        message : originalError.message,
        ...originalError
      };
    } else {
      this.originalError = originalError;
    }
  }
}

module.exports = ErrorHttp;
