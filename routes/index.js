var User = require('../models/user');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('index');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* POST login page. */
router.post('/login',
  function(req, res, next) {
		name = req.body.username;
		promotion = req.body.promotion;
    longitude = req.body.longitude;
    latitude = req.body.latitude;

		User.create(name, promotion, longitude, latitude);
		res.cookie('user', req.body.username, { maxAge: 900000, httpOnly: true });
    
    return next();
  },
  function(req, res) {
    res.redirect('/');
});

/* GET logout page. */
router.get('/logout', function(req, res){
  // clear the remember me cookie when logging out
  res.clearCookie('user');
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  var user = req.cookies.user
  if (user === undefined) {
    res.redirect('/login');
  }
  else {
    return next();
  }
}

module.exports = router;
