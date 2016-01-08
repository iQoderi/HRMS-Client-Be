var express = require('express');
var dbHelper = require('../common/dbHelper');
var router = express.Router();
var url = require('url');
/* GET home page. */

router.get('/', function (req, res, next) {
    res.send('啥也没有');
});

router.get('/signSpareTime', function (req, res, next) {
    res.render('index');
});

router.post('/signSpareTime', function (req, res, next) {
    var User = dbHelper.getModel('user');
    var data = req.body;
    User.create(data, function (err, docs) {
        if (err) {
            console.log('Mongodb err' + err);
        } else {
            res.send(200);
        }
    });
});
router.get('/mySpareTime', function (req, res, next) {
    var myUsername = req.query.username;
    var User = dbHelper.getModel('user');
    User.findOne({username: myUsername}, function (err, docs) {
        if (err) {
            console.log('Mongodb error');
        }
        if (!docs) {
            res.status(404);
        } else {
            res.render('mySpareTime',{spareTime:docs.mySpareTime});
        }
    });
});


module.exports = router;
