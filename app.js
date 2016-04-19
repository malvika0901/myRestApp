var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var users = require('./routes/objects');


var app = express();

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
app.use('/objects', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var http = require('http');
var server = http.createServer(app);


// error handlers

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // will check for malformed JSON objects

    var requestType = req.get('Content-Type');
    if(requestType!='application/json')
    {
      var errorMessage={"verb":"POST"};
      errorMessage.url=req.protocol + '://' + req.get('host') + req.originalUrl;
      errorMessage.message="Not a JSON object";
      res.send(errorMessage);
    }
    //will print stacktrace if the error is not regarding malformed JSON objects
    else
    {
      res.render('error', {
      message: err.message,
      error: err
    });
    } 
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

server.listen(8081); 
console.log('Express server started on port %d', server.address().port);

module.exports = app;
