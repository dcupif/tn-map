var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: 'TELECOM Nancy - Visitor Map'
    });
});

module.exports = router;
