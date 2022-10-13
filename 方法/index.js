// 获取cookie
export function getCookie (name) {
	var arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	if ((arr = document.cookie.match(reg))) return unescape(arr[2])
	else return null
}
//设置cookie
export function setCookie (key, value) {
	document.cookie = key + "=" + value;
}
// 获取UrlParam
export function getUrlParam (name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}
// 当前是否为苹果设备
export function isApple () {
	var isApple = /(iPhone|iPad|iPod|iOS|macintosh|mac os x)/i.test(
		navigator.userAgent
	)
	return isApple
}

//显示折后价时转换价格符号
export function currencyChange (currency) {
	var currency_arr = {
		"USD": "US$",
		"JPY": "JP¥",
		"EUR": "€",
		"GBP": "￡",
		"ARS": "ARS",
		"AUD": "A$",
		"CAD": "CA$",
		"CHF": "CHF",
		"CZK": "Kč",
		"DKK": "kr",
		"HKD": "HK$",
		"HUF": "HUF",
		"INR": "₹",
		"ILS": "ILS",
		"KRW": "KRW",
		"MXN": "MXN",
		"NOK": "NOK",
		"NZD": "NZD",
		"PLN": "PLN",
		"RUB": "RUB",
		"SEK": "SEK",
		"SGD": "SGD",
		"THB": "THB",
		"TRY": "TRY",
		"TWD": "NT$",
		"UAH": "₴",
		"BRL": "BRL",
		"CNY": "CN¥",
		"ZAR": "ZAR"
	};
	return currency_arr[currency];
}

//格式化参数
export function formatParams (data) {
	var arr = []
	for (var name in data) {
		arr.push(
			encodeURIComponent(name) + '=' + encodeURIComponent(data[name])
		)
	}
	arr.push('v=' + Math.floor(Math.random() * 10000 + 500))
	return arr.join('&')
}

// 文件size大小转化
export function conver (limit) {  
	var size = "";  
	if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B  
		size = limit.toFixed(2) + "B";    
	}else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB  
		size = (limit / 1024).toFixed(2) + "KB";              
	}else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB  
		size = (limit / (1024 * 1024)).toFixed(2) + "MB";  
	}else{ //其他转化成GB  
		size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";  
	}
	  
	var sizestr = size + "";
	var len = sizestr.indexOf("\.");  
	var dec = sizestr.substr(len + 1, 2);  
	if(dec == "00"){	//当小数点后为00时 去掉小数部分  
		return sizestr.substring(0,len) + sizestr.substr(len + 3,2);  
	}  
	return sizestr;  
}

