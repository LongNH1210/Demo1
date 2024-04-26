var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');



var app = express();

//Cấu hình mongoose
var mongoose = require('mongoose');
mongoose.set("strictQuery", false);
var db = "mongodb+srv://longbestrengar:mminhmtp123@test.jpbnxcd.mongodb.net/Toy2";
mongoose.connect(db)
.then(() => {console.log("Connect to db ok!")})
.catch((err) => {console.log("Fail to connect to db")});

//Khai báo và cấu hình body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded ({extended : false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);
app.use('/users', usersRouter);

app.use('/admin', adminRouter);
app.use('/toylist', adminRouter);


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

var port = process.env.PORT || 1111
app.listen(port);

module.exports = app;
