var express = require('express');
var dbHelper = require('../common/dbHelper');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('你愁啥，瞅你咋地');
});

//设置空闲时间
router.get('/signSpareTime', function (req, res, next) {
    var myUsername = req.query.user;
    var User = dbHelper.getModel('user');
    User.findOne({username: myUsername}, function (err, doc) {
        if (err) {
            console.log('mongodb error');
        }
        if (doc) {
            res.redirect('/mySpareTime?username=' + myUsername);
        } else {
            res.render('index');
        }
    });
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

//我的空闲时间
router.get('/mySpareTime', function (req, res, next) {
    var myUsername = req.query.username;
    var User = dbHelper.getModel('user');
    User.findOne({username: myUsername}, function (err, docs) {
        if (err) {
            console.log('Mongodb error');
        }
        if (!docs) {
            res.redirect('/signSpareTime?username='+myUsername)
        } else {
            var myClass=['一二节','三四节','五六节','七八节','九十节'];
            var tureImg="../images/background-true.png";
            res.render('mySpareTime', {spareTime: docs.mySpareTime,weekClass:myClass,spareBg:tureImg});
        }
    });
});

//更新空闲时间
router.get('/updateSpareTime', function (req, res, next) {
    res.render('updateSpareTime');
});

router.post('/updateSpareTime', function (req, res, next) {
    var User = dbHelper.getModel('user');
    var myUsername = req.body.username;
    console.log("---------"+myUsername);
    var data = req.body;
    console.log("+++++++"+data.mySpareTime);
    User.update({username: myUsername}, {$set: {mySpareTime: data.mySpareTime}},{ multi: true },function (err, doc) {
        if (err) {
            console.log('mongodb error');
        } else {
            res.redirect('/mySpareTime?username=' + myUsername);
            console.log("***"+doc);
            User.find({username:myUsername}, function (err, doc) {
                console.log("************************************")
                console.log(doc);
            })
        }
    })
});


module.exports = router;
