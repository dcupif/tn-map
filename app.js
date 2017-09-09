var express = require('express');
var flash = require('flash');
var path = require('path');
var passport = require('passport')
var favicon = require('serve-favicon');
var LocalStrategy = require('passport-local').Strategy
var RememberMeStrategy = require('passport-remember-me').Strategy
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');

/* Fake, in-memory database of users */

var users = [
  { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
, { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
var idx = id - 1;
if (users[idx]) {
  fn(null, users[idx]);
} else {
  fn(new Error('User ' + id + ' does not exist'));
}
}

function findByUsername(username, fn) {
for (var i = 0, len = users.length; i < len; i++) {
  var user = users[i];
  if (user.username === username) {
    return fn(null, user);
  }
}
return fn(null, null);
}

/* Fake, in-memory database of remember me tokens */

var tokens = {}

function consumeRememberMeToken(token, fn) {
var uid = tokens[token];
// invalidate the single-use token
delete tokens[token];
return fn(null, uid);
}

function saveRememberMeToken(token, uid, fn) {
tokens[token] = uid;
return fn();
}



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
findById(id, function (err, user) {
  done(err, user);
});
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
function(username, password, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
      return done(null, user);
    })
  });
}
));

// Remember Me cookie strategy
//   This strategy consumes a remember me token, supplying the user the
//   token was originally issued to.  The token is single-use, so a new
//   token is then issued to replace it.
passport.use(new RememberMeStrategy(
function(token, done) {
  consumeRememberMeToken(token, function(err, uid) {
    if (err) { return done(err); }
    if (!uid) { return done(null, false); }
    
    findById(uid, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  });
},
issueToken
));

function issueToken(user, done) {
var token = utils.randomString(64);
saveRememberMeToken(token, user.id, function(err) {
  if (err) { return done(err); }
  return done(null, token);
});
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

app.use('/', index);

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