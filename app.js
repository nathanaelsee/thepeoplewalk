var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
// var r = require('rethinkdbdash')();

// var connection = null;
// r.connect( {host: 'localhost', port: 28015, db: 'thepeoplewalk'}, function(err, conn) {
//     if (err) throw err;
//     connection = conn;
// });

var index = require('./routes/index');

var app = express();

/*app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// app.use(express.bodyParser());

// app.post('/', function(req, res) {
//   console.log(req.body);
//   var data = {
//     timestamp: r.now(),
//     location: "",
//     description: req.body.protestDescription,
//     classification: ""
//   };
//   r.table('ping').insert(data).run(connection, function(err, result) {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
//   });
//   res.sendStatus(200);
// });

function startExpress(connection) {
  app._rdbConn = connection;
  app.listen(config.express.port);
  console.log('Listening on port ' + config.express.port);
}

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

module.exports = app;
