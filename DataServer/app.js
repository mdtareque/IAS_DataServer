var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var notifications = require('./models/notify')

var routes = require('./routes/index');
var users = require('./routes/users');
var endpoints = require('./routes/endpoints');
var getSensorMetadata = require('./routes/sensor');
var getGatewaysMetadata = require('./routes/gateways');
var getEndUsers = require('./routes/getendusers');
var getUser = require('./routes/getuser');
var getApps = require('./routes/getapps');
var getRules = require('./routes/getrules');
var getNotifications = require('./routes/notifications');
var app = express();

/*var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/iotdb", function(err){
  if(err)
    throw err;  
    console.log("Connected to mongodb")
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/endpoints', endpoints);
app.use('/getSensor', getSensorMetadata);
app.use('/getGateways', getGatewaysMetadata);
app.use('/getEndUsers', getEndUsers);
app.use('/getuser', getUser);
app.use('/getrules', getRules);
app.use('/notifications', getNotifications);
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


module.exports = app;
