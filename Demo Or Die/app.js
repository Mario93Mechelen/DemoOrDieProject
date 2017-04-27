var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/facebookusers');

var facebook = require('./routes/facebook');
var users = require('./routes/users');
var profile = require('./routes/profile');
var login = require('./routes/login');
var admin = require('./routes/admin');
var vote_now = require('./routes/vote_now');
var vote_result = require('./routes/vote_result');
var groups = require('./routes/groups');
var endvoting = require('./routes/endvoting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('combined'));
app.use(session({ secret: 'marioWim' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/users', users);
app.use('/profile', profile);
app.use('/login', login);
app.use('/admin', admin);
app.use('/vote_now', vote_now);
app.use('/vote_result', vote_result);
app.use('/auth/facebook', facebook);
app.use('/groups', groups);
app.use('/endvoting', endvoting);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000, function () {
    console.log('Example app listening on port 3001!');
    console.log('gewoon wat bijtesten');
});

module.exports = app;
