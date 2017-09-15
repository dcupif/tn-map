var User = require('../models/user');
var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    /* GET home page. */
    router.get('/', ensureAuthenticated, function(req, res, next) {
        User.findAll(function(users) {
            res.render('index', {users});
        });
    });

    /* GET login page. */
    router.get('/login', function(req, res, next) {
      res.render('login');
    });

    /* AUTH Facebook */
    router.get('/auth/facebook',
        passport.authenticate('facebook'));

    router.get('/login/facebook/return',
      	passport.authenticate( 'facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
    });

    /* AUTH Google */
    router.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] }));

    router.get( '/auth/google/callback',
      	passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
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
    router.get('/logout', function(req, res) {
      // clear the remember me cookie when logging out
      res.clearCookie('user');
      res.redirect('/');
    });

    /* GET deleteAll page  */
    router.get('/deleteAll', function(req, res) {
    	User.deleteAll();
      res.clearCookie('user');
    	res.redirect('/');
    });

    /* GET init page  */
    router.get('/init', function(req, res) {
    	User.deleteAll();
      res.clearCookie('user');
      User.init();
    	res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/login')
  }

    return router;

}
