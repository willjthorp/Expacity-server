const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const response = require('./helpers/response');
const configure = require('./config/passport');
const multer = require('multer');

const index = require('./routes/index');
const users = require('./routes/users');
const cityApi = require('./routes/cityapi');
const auth = require('./routes/auth');
const question = require('./routes/questionapi');

const app = express();

mongoose.connect('mongodb://localhost/final-project');

app.use(session({
  secret: 'todo-app',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

configure(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', index);
app.use('/users', users);
app.use('/cityapi', cityApi);
app.use('/auth', auth);
app.use('/question', question);


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
