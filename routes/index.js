var User = require('../models/user');
var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    /* GET home page. */
    router.get('/', ensureAuthenticated, function(req, res, next) {
        User.findAll(function(users) {
            //Remove user in the future, when it will be in the db
            res.render('index', {users: users});
        });
    });

    /* POST updateGeolocation. */
    router.post('/updateGeolocation', function(req, res, next) {
        User.update(req.session.passport.user._id, req.body.latitude, req.body.longitude).then(function() {
            res.render('/');
        })
    });

    /* AUTH Facebook */
    router.get('/auth/facebook', passport.authenticate('facebook') );

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
            res.redirect('/');
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
        res.redirect('/login')
    }

    return router;

}
