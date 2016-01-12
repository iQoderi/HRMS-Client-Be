/**
 * Created by qoder on 16-1-7.
 */
window.onload = function () {
    var getClass = function (className) {
        return document.getElementsByClassName(className);
    };
    var spareTime = [];

    //Ajax
    var xmlhttp;
    var Ajax = function (method, url, data, async, fn) {  //async：true（异步）或 false（同步）
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                fn();
            }
        }
        xmlhttp.open(method, url, async);
        xmlhttp.setRequestHeader("Content-type", "application/json");

        if (method === 'POST') {
            xmlhttp.send(data)
        } else {
            xmlhttp.send();
        }
    };

    var spareFilter = function (spareArr) {
        var res = [];
        for (var i = 0; i < spareArr.length; i++) {
            res.push(spareArr[i].checked);
        }
        return res;
    }
    var sendArray = function () {
        spareTime = [];
        var MonSpareTime = spareFilter(getClass('MonSpareTime'));
        var TueSpareTime = spareFilter(getClass('TueSpareTime'));
        var WedSpareTime = spareFilter(getClass('WedSpareTime'));
        var ThuSpareTime = spareFilter(getClass('ThuSpareTime'));
        var FriSpareTime = spareFilter(getClass('FriSpareTime'));
        var SatSpareTime = spareFilter(getClass('SatSpareTime'));
        var SunSpareTime = spareFilter(getClass('SunSpareTime'));
        alert('确定提交表单?');
        spareTime.push(MonSpareTime);
        spareTime.push(TueSpareTime);
        spareTime.push(WedSpareTime);
        spareTime.push(ThuSpareTime);
        spareTime.push(FriSpareTime);
        spareTime.push(SatSpareTime);
        spareTime.push(SunSpareTime);
        return spareTime;
    }

    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.onclick = function () {
            sendArray();
            var sendData = JSON.stringify({
                username: 'Qoder',
                department: '打杂的',
                tel: '18716037332',
                mySpareTime: spareTime
            });
            Ajax('POST', '/signSpareTime', sendData, true, function () {
                window.location.pathname = '/mySpareTime';
                console.log('called');

            });
            this.setAttribute('disabled','true');
        }
    }

    var reSubmitBtn=document.getElementById('re-submit-btn');
    if (reSubmitBtn){
        reSubmitBtn.onclick = function () {
            sendArray();
            console.log()
            var sendData = JSON.stringify({
                username: 'Qoder',
                department: '打杂的',
                tel: '18716037332',
                mySpareTime: spareTime
            });
            Ajax('POST', '/updateSpareTime', sendData, true, function () {
                window.location.pathname = '/mySpareTime';
            });
        }
    }
};