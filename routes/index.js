var express = require('express');
var router = express.Router();

module.exports = function(passport, issueToken) {

	/* GET home page. */
	router.get('/', ensureAuthenticated, function(req, res, next) {
	    res.render('index');
	});

	/* GET login page. */
	router.get('/login', function(req, res, next) {
	  res.render('login', {
	  		user: req.user,
	  		message: req.flash('error') });
	});

	/* POST login page. */
	router.post('/login', 
	  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
	  function(req, res, next) {
	    // Issue a remember me cookie if the option was checked	  
	    issueToken(req.user, function(err, token) {
	      if (err) { return next(err); }
	      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
	      return next();
	    });
	  },
	  function(req, res) {
	    res.redirect('/');
	  });

	/* GET logout page. */
	router.get('/logout', function(req, res){
	  // clear the remember me cookie when logging out
	  res.clearCookie('remember_me');
	  req.logout();
	  res.redirect('/');
	});

	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/login')
	}

	return router;
}
