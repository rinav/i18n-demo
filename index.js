const http = require('http');
const i18n = require('i18n');
const url = require('url');
let app;

// minimal config
i18n.configure({
  locales: ['en', 'de', 'hi'],
  directory: __dirname + '/locales',
  defaultLocale: 'de',
  queryParameter: 'lang'
});


// simple server
app = http.createServer(function (req, res) {
  var delay = app.getDelay(req, res);

  // init & guess
  i18n.init(req, res);

  // delay a response to simulate a long running process,
  // while another request comes in with altered language settings
  // setTimeout(function () {
  //   //res.end(res.__('Hello World'));
  //   render(req, res);
  // }, delay);

  render(req, res);


});

var getBody = function (req, res) {

  var body = '';

  body += '<!DOCTYPE html><html lang="en">';
  body += '<head> <meta charset="utf-8"></head>';
  body += '<body><h3>';

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  console.log(query);

  body += res.__('Hello') + '</br> current locale is: ' + query.lang;
  body += '</h3><p>' + res.__('Hello World') + ' </p>';
  body += '</body></html>';

  //body += ' res.locals: ' + res.locals.__('Hello');
  //body += ' funkyObject: ' + funkyObject.__('Hello');
  return body;
};

var render = function (req, res) {
  setTimeout(function () {
    res.end(getBody(req, res));
  }, app.getDelay(req, res));
};

// simple param parsing
app.getDelay = function (req, res) {
  return url.parse(req.url, true).query.delay || 0;
};

// startup
app.listen(3000, '127.0.0.1');
