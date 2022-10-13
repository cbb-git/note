<template>
  <div>
         <div class="login-content">
      <h3 id="openLogin" @click="open">点击弹出登录框</h3>
    </div>
    <div class="login" ref="mylogin">
      <div class="closeBtn" id="closeBtn" @click="close">关闭</div>
      <h4 class="loginHeader" @mousedown="mymousedown($event)">登录会员</h4>
    </div>
    <div class="modal" ref="mymodal"></div>
  </div>
  
</template>

<script>
export default {
data () {
    return {
       
    }
},
methods:{
open(){
    this.$refs.mymodal.style.display = "block";
        this.$refs.mylogin.style.display = "block"; 
},
close(){
 this.$refs.mymodal.style.display = "none";
          this.$refs.mylogin.style.display = "none";
},
mymousedown(e){
     const x = e.pageX - this.$refs.mylogin.offsetLeft;
        const y = e.pageY - this.$refs.mylogin.offsetTop;
        const move =  (e)=>{
            this.$refs.mylogin.style.left = `${e.pageX - x}px`;
            this.$refs.mylogin.style.top = `${e.pageY - y}px`;
        };
        // 2. 移动鼠标
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", move);
        });
}
},
mounted () {
 


}
}
</script>

<style lang="scss" >
   * {
        margin: 0;
        padding: 0;
      }
      .login,
      .modal {
        display: none;
      }
      .login {
        width: 512px;
        height: 280px;
        position: fixed;
        border: #ebebeb solid 1px;
        left: 50%;
        top: 50%;
        background-color: #fff;
        box-shadow: 0 0 20px #ddd;
        z-index: 999;
        transform: translate(-50%, -50%);
        text-align: center;
      }
      .modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 998;
      }
      .login-content {
        margin: 100px auto;
        text-align: center;
      }
      .login-content h3:hover,
      .closeBtn:hover {
        cursor: pointer;
      }
      .closeBtn {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .login h4 {
        margin-top: 10px;
      }
      .login h4:hover {
        cursor: move;
      }

</style>