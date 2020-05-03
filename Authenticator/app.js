var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//https configuration
var fs = require('fs');
var http = require('http'); 
var https = require('https');
var privateKey  = fs.readFileSync(__dirname +'\\certs\\server.key', 'utf8');
var certificate = fs.readFileSync(__dirname +'\\certs\\server.cert', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var app = express();

const { auth } = require('express-openid-connect');

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth({
  required: false,
  auth0Logout: true,
  appSession: {
    secret: '2o4ug4wja;gaji48wgjvlSDVMlekjga;lvkw4tj43qjtgwogi4jojI'
  },
  baseURL: 'https://localhost:8443',
  clientID: 'rZRwpkFw6N6qSTdWJH6LCnWbMu6UoMTj',
  clientSecret: 'n9K91EnCbOe7PAFTS3VXqMXEEnRQdX9499sfZNVED-iigHlUacvYvG0FgXSayLeI',
  issuerBaseURL: 'https://dev-9lskuac3.auth0.com',
  handleCallback: async function (req, res, next) {
    const client = req.openid.client;
    req.appSession = req.appSession || {};
    try {
      req.appSession.claims = await client.userinfo(req.openidTokens);
      next();
    } catch(e) {
      next(e);
    }
  },
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
}));



/* req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out');
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

httpServer.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    case 'JWEDecryptionFailed':
      console.error("jwt error - need to log user out.");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
