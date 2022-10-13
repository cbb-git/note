module.exports = {
// 手机号
iphone(data){
    return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(data)
},
// 邮箱
e_mail(data){
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(data)
},
// 人名
name(data){ 
  return /^[\u4e00-\u9fa5]{2,4}$/.test(data)
},
qq(data){
  return  /^[1-9][0-9]\d{4,9}$/.test(data)
},
// 邮政编码
postalCode(data){
    return /^[1-9]\d{5}$/.test(data)
},
// 身份证校验
identity(data){
    return /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(data)
}

}
// 第二种方法
// export function iphone(data){

//     return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(data)

// }
// 导出对象
// export const mydata = {

// }
// 密码正则
//https://blog.csdn.net/fxhflower/article/details/8255083?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162495522216780255265130%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=162495522216780255265130&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-3-8255083.pc_search_result_before_js&utm_term=%E5%AF%86%E7%A0%81%E6%AD%A3%E5%88%99&spm=1018.2226.3001.4187