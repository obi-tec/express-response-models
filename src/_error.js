class ErrorHttp extends Error {
  constructor(message, httpStatusCode, businessStatusCode, originalError = null) {
    super(message);
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
