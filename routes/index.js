var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'TELECOM Nancy - Visitor Map'
    });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {
  		user: req.user,
  		title: 'Login Page',
  		message: req.flash('error') });
});

module.exports = router;
