var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotev = require('dotenv');
const cors = require('cors');
dotev.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UsersRouter');
var career = require('./routes/screen/career');


var aceRouter = require('./routes/acedemics');
var careerRouter = require('./routes/careers');
var cvRouter = require('./routes/cvs');
var experienceRouter = require('./routes/experiences');
var payformRouter = require('./routes/payforms');
var worktypeRouter = require('./routes/worktypes');
var statusRouter = require('./routes/status');
var postRouter = require('./routes/post');
var testimgRouter = require('./routes/testimg');
<<<<<<< HEAD
var genderRouter = require('./routes/gender.js');
var worksaveRouter = require('./routes/worksave');
var applyRouter = require('./routes/apply');

=======
var adminRouter = require('./routes/admins');
>>>>>>> c6af8beec4b8b6167fcbfa16140293752af80759
//connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sakuraimusic123:Datn2023@linksdaily.pfhz3ry.mongodb.net/jobapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors({ origin: true, credentials: true }));

app.use(logger('dev'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

app.use(express.static("styles"));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/career', career);
app.use('/admin',adminRouter);
app.use('/acedemics', aceRouter);
app.use('/careers', careerRouter);
app.use('/cvs', cvRouter);
app.use('/experiences', experienceRouter);
app.use('/payforms', payformRouter);
app.use('/worktypes', worktypeRouter);
app.use('/status', statusRouter);
app.use('/posts', postRouter);
app.use('/test', testimgRouter);
<<<<<<< HEAD
app.use('/gender', genderRouter);
app.use('/worksave', worksaveRouter);
app.use('/apply', applyRouter);
=======
app.use(express.static("dist"))
app.use(express.static("plugins"))
>>>>>>> c6af8beec4b8b6167fcbfa16140293752af80759


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
