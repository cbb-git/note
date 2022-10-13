<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view />
  </div>
</template>
<script>

export default {

  created() {
    let winWidth = document.getElementsByTagName('html')[0].getBoundingClientRect().width || window.innerWidth; 
                                                                              // 设计稿宽度
                  document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth / 1980+'px';
                  window.addEventListener('resize',function(){
                    winWidth = window.innerWidth
                    document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth / 1980+'px';
                     });
                     console.log(winWidth);
  },
  data() {
    return {};
  },

};
</script>

<style lang="scss">

</style>
