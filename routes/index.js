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
		console.log('I got this. username: ' + name + ' / promotion: ' + promotion);
		User.create(name, promotion, 0, 0);
		console.log('New user inserted successfully!');
		// add user db
		// create cookie
		//console.log(req);
		return next();

  },
  function(req, res) {
    res.redirect('/');
});

/* GET logout page. */
router.get('/logout', function(req, res){
  // clear the remember me cookie when logging out
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  //if cookie exist { return next(); }
  //res.redirect('/login')
  return next();
}

module.exports = router;
