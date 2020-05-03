var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const { auth } = require('express-openid-connect');

const config = {
  required: false,
  auth0Logout: true,
  appSession: {
    secret: 'g;wagjjqgm24gjq4oijg;almgklasg;ljilejs'
  },
  baseURL: 'http://localhost:3000',
  clientID: 'rZRwpkFw6N6qSTdWJH6LCnWbMu6UoMTj',
  issuerBaseURL: 'https://dev-9lskuac3.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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
