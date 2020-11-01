var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var createRouter = require('./routes/CRUD/create');
var readRouter = require('./routes/CRUD/read');
var updateRouter = require('./routes/CRUD/update');
var deleteRouter = require('./routes/CRUD/delete');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional\
var firebase = require("firebase-admin");
/*var firebase1 = require('firebase/app');
require('firebase/auth');
require('firebase/database');*/
var serviceAccount = require("./public/serviceAccountKey");

var firebaseConfig = {
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




var app = express();

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
app.use('/create',createRouter);
app.use('/read',readRouter);
app.use('/update',updateRouter);
app.use('/delete',deleteRouter);


/*app.get('/create', (request, response) => {
  /*
  * This is for realtime database, however does not work for now
  * const ref = firebase.database().ref("/baslik");

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function (snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

   * Create function for firebase firestore, demo version.

  (async () => {
    try {
      var db = firebase.firestore();
      await db.collection('itemsaa').doc('/' + 'Baslik' + '/')
          .create({item: "alaCi"});
      return response.status(200).send();
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  })();

} );*/

app.get('/read', (request, response) =>{

});

app.get('/update', (request, response) =>{

})

app.get('/delete', (request, response) => {

});



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
