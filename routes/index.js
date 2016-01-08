var express = require('express');
var dbHelper = require('../common/dbHelper');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/mySpareTime', function (req, res, next) {
    var User=dbHelper.getModel('user');
    User.find()
    res.render('mySpareTime');
});

module.exports = router;
