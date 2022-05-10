<p align="center">
  <a href="https://www.obitec.com.br/" target="_blank">
    <img src="https://media-exp1.licdn.com/dms/image/C4D0BAQEF_yY60ZuXMw/company-logo_100_100/0/1612555454150?e=1659571200&v=beta&t=J5EkLoozUME9lupU-MSfXHSWOqAfVnNrd320Xa9BPLM"/>
  </a>
</p>

<a name="description"></a>

# Express Response Models
<p align="center">🚀 A simple library to manage response (success or error) using express library</p>


<a name="content"></a>

###  🏁 Content
<!--ts-->
   * [Install](#install)
   * [How to use](#how-to-use)
   * [Status](#status)
<!--te-->

<br>
<a name="install"></a>

# Install
```bash
npm install @obi-tec/express-response-models
```
See all tags clicking <a href="https://github.com/obi-tec/express-response-models/tags"> here</a>.

<br>

### Using DatabaseConnection
In your main root file, where you import express library, you must set the following settings in middleware:

``` javascript
const { response, ErrorHttp } = require('@obi-tec/express-response-models');

// Add function success to express response object 
app.use(function(req, res, next) {
  res.success = (body, statusCode = 200, headers = null, cache = 0) => {
      return response.success(res, body, statusCode, headers, cache);
  };

  res.ErrorHttp = ErrorHttp;

  next();
});

// Handler to ErrorHttp Class
app.use((err, request, response, next) => {
  if (err instanceof ErrorHttp) {
    return response.status(err.httpStatusCode).json({
      message : err.message,
      code    : err.businessStatusCode
    });
  }

  return response.status(500).json({
    message : 'Internal server error',
    code    : 'internal-server-error'
  });
});
// 
```

After declaring in your main file, you are able to use this library to respond to:
- A success request
  ``` javascript
    return res.success(body, 200);
  ```
- An error request
  ``` javascript
    throw new res.ErrorHttp('Error message', 400, 'api-name-400_error-message');

    // OR just
    throw new ErrorHttp('Error message', 400, 'api-name-400_error-message');
  ```
<br>
<a name="status"></a>

# Status
<h4 align="center">
	🚧  Open for contribuitions...   🚧
</h4>