const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const adminRouter = require('./routes/admin')

const createRouter = require('./routes/CRUD/create');
const readRouter = require('./routes/CRUD/read');
const updateRouter = require('./routes/CRUD/update');
const deleteRouter = require('./routes/CRUD/delete');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional\
const firebase = require("firebase-admin");
const serviceAccount = require("./public/serviceAccountKey");
const firebaseConfig = {
  apiKey: "AIzaSyDHjjhVUCp7IXb2HXSoxM9uiKgSPXAff_c",
  authDomain: "blogandarticles-6e198.firebaseapp.com",
  databaseURL: "https://blogandarticles-6e198.firebaseio.com",
  projectId: "blogandarticles-6e198",
  storageBucket: "blogandarticles-6e198.appspot.com",
  messagingSenderId: "995110346279",
  appId: "1:995110346279:web:868c039ddca53632f03802",
  measurementId: "G-621MFMLHSJ",
  credential: firebase.credential.cert(serviceAccount)
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");




app.disable('etag');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/admin', adminRouter);

app.use('/create',createRouter);
app.use('/read',readRouter);
app.use('/update',updateRouter);
app.use('/delete',deleteRouter);



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
