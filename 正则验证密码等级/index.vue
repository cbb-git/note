<template>
  <div id="dv">
  <label for="password">密码</label>
  <input type="text" id="password" @keyup="mykeyup" v-model="value" maxlength="16">
  <div>
    <b>密码强度：</b>
    <em id="strength"></em>
    <div id="strengthLevel" ref="Level" class="strengthLv0"></div>
  </div>
</div>
</template>

<script>
export default {
     data () {
        return {
            value:'',
        }
    },
 
methods: {


 //获取文本框注册键盘抬起事件
 mykeyup(){
if(this.value.length>=6){
     //每次键盘抬起都要获取文本框中的内容,验证文本框中有什么东西,得到一个级别,然后下面的div显示对应的颜色
   //如果密码的长度是小于6的,没有必要判断
   
     var lvl=this.getLvl(this.value);
     if(lvl==1){
       //弱
       this.$refs.Level.className="strengthLv1";
     }else if(lvl==2){
       this.$refs.Level.className="strengthLv2";
     }else if(lvl==3){
       this.$refs.Level.className="strengthLv3";
     }else{
       this.$refs.Level.className="strengthLv0";
     }
   }else{
     this.$refs.Level.className="strengthLv0";
   }

 },

 //给我密码,我返回对应的级别
 getLvl(password) {
   var lvl=0;//默认是0级
   //密码中是否有数字,或者是字母,或者是特殊符号
   if(/[0-9]/.test(password)){
     lvl++;
   }
   //判断密码中有没有字母
   if(/[a-zA-Z]/.test(password)){
     lvl++;
   }
   //判断密码中有没有特殊符号
   if(/[^0-9a-zA-Z_]/.test(password)){
     lvl++;
   }
   return lvl;//1  3
 }
}
}
</script>

<style lang="scss" scoped>
  #dv{
    width: 300px;
    height:200px;
    position: absolute;
    left:100px;
    top:100px;
     .strengthLv0 {
    height: 6px;
    width: 120px;
    border: 1px solid #ccc;
    padding: 2px;
  }

  .strengthLv1 {
    background: red;
    height: 6px;
    width: 40px;
    border: 1px solid #ccc;
    padding: 2px;
  }

  .strengthLv2 {
    background: orange;
    height: 6px;
    width: 80px;
    border: 1px solid #ccc;
    padding: 2px;
  }

  .strengthLv3 {
    background: green;
    height: 6px;
    width: 120px;
    border: 1px solid #ccc;
    padding: 2px;
  }
  }
 

</style>