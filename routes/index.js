var express = require('express');
var dbHelper = require('../common/dbHelper');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('你愁啥，瞅你咋地');
});

//设置空闲时间
router.get('/signSpareTime', function (req, res, next) {
    var myUsername = req.query.username;
    var User = dbHelper.getModel('user');
    User.findOne({username: myUsername}, function (err, doc) {
        if (err) {
            console.log('mongodb error');
        }
        if (doc) {
            res.redirect('/mySpareTime?username=' + myUsername);
            console.log('called');
        } else {
            res.render('index');
        }
    });
});


router.post('/signSpareTime', function (req, res, next) {
    var User = dbHelper.getModel('user');
    var data = req.body;
    console.log(req.session.hasSign);
    if (req.session.hasSign===undefined) {
        User.create(data, function (err, docs) {
            if (err) {
                console.log('Mongodb err' + err);
            } else {
                req.session.hasSign =1;
                res.send(200);
            }
        });
    } else {
        console.log('called');
        res.send('确定重新提交表单？');
    }
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
            res.redirect('/signSpareTime?username=' + myUsername)
        } else {
            var myClass = ['一二节', '三四节', '五六节', '七八节', '九十节'];
            res.render('mySpareTime', {spareTime: docs.mySpareTime, weekClass: myClass});
        }
    });
});

//更新空闲时间
router.get('/updateSpareTime', function (req, res, next) {
    var User = dbHelper.getModel('user');
    var myUsername = req.query.username;
    var weekDay = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    var myClass = ['一二节', '三四节', '五六节', '七八节', '九十节'];
    var ClassName = ['MonSpareTime', 'TueSpareTime', 'WedSpareTime', 'ThuSpareTime', 'FriSpareTime', 'SatSpareTime', 'SunSpareTime'];
    User.findOne({username: myUsername}, function (err, doc) {
        if (err) {
            res.send(500);
            console.log('mongodb error');
        } else {
            res.render('updateSpareTime', {
                myWeekDay: weekDay,
                myWeekClass: myClass,
                mySpareTime: doc.mySpareTime,
                myClassName: ClassName
            });
        }
    });

})
;

router.post('/updateSpareTime', function (req, res, next) {
    var User = dbHelper.getModel('user');
    var myUsername = req.body.username;
    var data = req.body;
    User.update({username: myUsername}, {$set: {mySpareTime: data.mySpareTime}}, {multi: true}, function (err, doc) {
        if (err) {
            console.log('mongodb error');
        } else {
            res.redirect('/mySpareTime?username=' + myUsername);
            User.find({username: myUsername}, function (err, doc) {
                console.log(doc);
            })
        }
    })
});


module.exports = router;
