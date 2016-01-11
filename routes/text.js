/**
 * Created by xzx on 2016/1/9.
 */
var array =
    [[false, false, false, false, false],
        [true, false, true, false, true],
        [false, true, false, true, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]]

function toInt(array) {
    //把array变成整数，周一到周六在low，周日在high
    var low = 0;//low 低30位
    var high = 0;//high 高5位
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 5; ++j) {
            if (array[i][j]) {
                low = low | (1 << (i * 5 + j));
            }
        }
    }
    for (var j = 0; j < 5; ++j) {
        if (array[6][j]) {
            high = high | (1 << j);
        }
    }
    return {
        low: low,
        high: high
    }
}

function toArray(llInt) {
    //把两个整数变成数组
    var low = llInt.low;
    var high = llInt.high;
    console.log("toArray");
    console.log(low);
    console.log(high);
    var ret = array;
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 5; ++j) {
            if (low & (1 << (i * 5 + j))) {
                ret[i][j] = true;
            } else {
                ret[i][j] = false;
            }
        }
    }
    for (var j = 0; j < 5; ++j) {
        if (high & (1 << j)) {
            ret[6][j] = true;
        } else {
            ret[6][j] = false;
        }
    }
    return ret;
}

function Match(llIntTar, llIntDat) {
    //data匹配target
    if ((llIntTar.low & llIntDat.low === llIntTar.low) && (llIntTar.high & ((1 << 5) - 1) & llIntDat.high === llIntTar.high & ((1 << 5) - 1)))return true;
    return false;
    /*    for(var i = 0; i <30;++i){
     if(llIntTar.low&(1<<i)){
     if(!(llIntDat.low&(1<<i))){
     return false;
     }
     }
     }
     for(var i = 0; i < 5; ++i){
     if(llIntTar.high&(1<<i)){
     if(!(llIntDat.low&(1<<i))){
     return false;
     }
     }
     }
     return true;*/
}

module.exports = {
    toInt: toInt,
    toArray: toArray,
    Match: Match
}