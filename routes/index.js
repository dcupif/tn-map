var User = require('../models/user');
var express = require('express');
var router = express.Router();
var moment = require("moment");

module.exports = function(passport) {

    /* GET home page. */
    router.get('/', ensureAuthenticated, function(req, res, next) {
        var username;
        if (req.session.passport === undefined
            || ( Object.keys(req.session.passport).length === 0 && req.session.passport.constructor === Object) ) {
            username = req.cookies.user;
        } else {
            username = req.session.passport.user.name;
        }
        User.findAll(function(users) {
            res.render('index', {users: users, username: username, moment: moment});
        });
    });


    router.get('/temp', ensureAuthenticated, function(req, res, next) {
        res.render('temp');
    });

    /* POST updateGeolocation. */
    router.post('/updateGeolocation', function(req, res, next) {
        User.update(req.session.passport.user._id, req.body.latitude, req.body.longitude, function() {
            res.redirect('/');
        });
    });

    /* AUTH Facebook */
    router.get('/auth/facebook', passport.authenticate('facebook') );

    router.get('/login/facebook/return',
      	passport.authenticate( 'facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/temp');
    });

    /* AUTH Google */
    router.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] }));

    router.get( '/auth/google/callback',
      	passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/temp');
    });

    /* GET login page. */
    router.get('/login', function(req, res, next) {
        if (req.isAuthenticated() || req.cookies.user !== undefined) {
            res.redirect('/');
        } else {
            res.render('login');
        }
    });

    /* POST login page. */
    router.post('/login',
        function(req, res, next) {
        		name = req.body.username;
        		promotion = req.body.promotion;
                longitude = req.body.longitude;
                latitude = req.body.latitude;

        		User.create(name, promotion, longitude, latitude, null, null);
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
        User.init();
      	res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
        //Check if user is auth via Facebook/Google or via Local Strategy (cookie)
        if (req.isAuthenticated() || req.cookies.user !== undefined) {
          return next();
        }
        
        if (  moment() >= moment("2017-09-23T00:00:00+01:00") ) {
            res.redirect('/login');
        } else {
            res.render('countdown');
        }
    }

    return router;

}
