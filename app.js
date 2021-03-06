var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var index = require('./routes/index')(passport);
var User = require('./models/user');
var Chat = require('./models/chat');

var app = express();

var config = require("./config.json")

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.find(user._id, function (result) {
        done(null, result);
    });
});

passport.use(new GoogleStrategy({
    clientID: "399948868446-j6d70f659p75fagp03ead90bq6i5359c.apps.googleusercontent.com",
    clientSecret: "YrY8kmoyCtkRh3IF840m8d62",
    callbackURL: config.host+"/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreateGoogle(profile, function (err, user) {
        if (err) {console.log(err);}
        return cb(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: "116237885713574",
    clientSecret: "fa9c6eb93889cc70adb42ac7e7f7e187",
    callbackURL: config.host+'/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreateFacebook(profile, function (err, user) {
        if (err) {console.log(err);}
        return cb(err,user);
    });
  }
));

app.use(session({ secret: '12ansdubatiment' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect('/');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});


module.exports = app;
