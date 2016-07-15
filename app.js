var express      = require('express');
var app          = express();
module.exports   = app;

var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var session      = require('./persistence/session')(app);
var public_site  = require('./routes/public_site');
var public_data  = require('./routes/public_data');
var admin_site   = require('./routes/admin_site');
var admin_data   = require('./routes/admin_data');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json(
/*
  {
    verify: function(req, res, buf, encoding) {
      req.rawBody = buf.toString();
    }
  }
*/
));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',     public_site);
app.use('/data', public_data);

// a public facing login page is followed by "admin" authentication.
// all other "admin" routes (including the restful API) require an active session.
app.use('/admin',      admin_site);
app.use('/admin/data', admin_data);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
