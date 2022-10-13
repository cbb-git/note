<template>
<div>
  
  <div @click="jump">cbbb</div>
  <div @click="jump2">cbb</div>
  <div @click="push">123456</div>
  <a href="/132456.pdf" download>1111</a>
  <div class="myimg">
   <img class="myimg_son" src="../assets/zhen.jpg" alt="">
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      my:''
    }
  },
  methods: {
    jump(){
      localStorage.setItem('name','cbbb')
      this.$router.push('/two')
  
    },
    jump2(){
      this.$router.push('/two')
  
    },
    push(){
  let a = document.createElement('a')
    a.href ="/132456.pdf"
    a.download = '1348'
   
    }
  },
  mounted(){
   
  }
}
</script>

<style lang="scss" scoped>
.myimg {
  width: 200px;
  height: 300px;
  border: 1px solid orange;
  overflow: hidden;
  // background-size: ;
  .myimg_son {
    height: 100%;
    width: auto;
    animation: frame 2s steps(7) infinite;
  }

}
@keyframes frame{
100% {
  transform: translateX(-100%);
}
}
</style>
