
/**
 * 对象转URL
 */
export const urlEncode = function(data) {
    var _result = [];
    for (var key in data) {
        var value = data[key];
        if (value.constructor == Array) {
            value.forEach(_value => {
                _result.push(key + "=" + _value);
            });
        } else {
            _result.push(key + '=' + value);
        }
    }
    return _result.join('&');
}

export const deepCopy = function (obj) {
    //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === "object") {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepCopy(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
};
/*
@parmas current 页面栈,非必传,不传的时候默认返回上一页
*/
export const getPage = function (current) {
    if (!current) {
        current = 2;
    }
    var pages = getCurrentPages(),
        length = pages.length,
        page = pages[length - current];
    return page
};

/*
*时间戳转化日期方法
*@params val 时间戳,必传;
*@params type 转化类型,非必传,默认返回年月日加时间,等于ymd时,返回年月日,等于hms返回时间
*/
export const timeToDate = function (val,type) {
    if(!val){
        throw new Error('val ')
    }
    var date = new Date(val * 1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    M = M < 10 ? '0' + M : M;
    D = D < 10 ? '0' + D : D;
    H = H < 10 ? '0' + H : H;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    if(!type){
        return `${Y}-${M}-${D} ${H}:${m}:${s}`
    }else if(type === 'ymd'){
        return `${Y}-${M}-${D}`
    }else if(type === 'hms'){
        return `${H}:${m}:${s}`
    }

};
//支付统一处理方法
export const payMoney = function (pay_info) {
    return new Promise((resolve,reject)=>{
        uni.requestPayment({
            timeStamp: pay_info.timestamp,
            nonceStr: pay_info.nonceStr,
            package: pay_info.package,
            signType: pay_info.signType,
            paySign: pay_info.paySign,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
export const hasLogin = function () {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    uni.getUserInfo({
                        success(res) {
                            console.log('我授权登陆过了')
                            resolve(res);
                        }
                    })
                } else {
                    uni.hideLoading();
                    reject()
                }
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
/**
 * 将时间戳转化为多久以前
 * */
export const changeTime = function(timestamp) {
    let currentUnixTime = Math.round((new Date()).getTime() / 1000);
    let deltaSecond = currentUnixTime - parseInt(timestamp, 10);
    let result;
    if (deltaSecond < 60) {
        result = deltaSecond + '秒前';
    } else if (deltaSecond < 3600) {
        result = Math.floor(deltaSecond / 60) + '分钟前';
    } else if (deltaSecond < 86400) {
        result = Math.floor(deltaSecond / 3600) + '小时前';
    } else {
        result = Math.floor(deltaSecond / 86400) + '天前';
    }
    return result;
}

const professTotal = function(val) {
    if(!val)return 0;
    if (val > 10000) {
        return (val / 10000).toFixed(2) + '万'
    } else {
        return val
    }
}

export default {
    deepCopy,
    getPage,
    timeToDate,
    payMoney,
    hasLogin,
    urlEncode,
    changeTime,
    professTotal
}
