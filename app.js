var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('./passport/index');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: 'SECRET',
        resave: true,
        saveUninitialized: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

const index = require('./routes/index');
const news = require('./routes/news');

app.set('view engine', 'pug');

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

app.use('/', index);
app.use('/news', news);

app.use(function(req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
