<template>
<div>
<div class="box">
    <svg class="anim" :width="round_size" :height="round_size">
   <circle fill="transparent" :stroke-width="round_border" stroke="#b5b5b5" :r="radius" :cx="circleOffset" :cy="circleOffset" ></circle> 
    <circle
              class="circle"
              fill="transparent"
              :stroke-width="round_border"
              stroke="#000"
              :r="radius"
              :cx="circleOffset"
              :cy="circleOffset"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashoNumber"
              stroke-linecap="round"></circle>
              
</svg>
<span class="anim_font" style="display:block;">{{result}}</span>
</div>
<button @click="activeHandle" class="active">倒计时！</button>
</div>
</template>

<script>
import { Circle } from 'vant'
export default {
data () {
    return {
        // 大小
        round_size:120,
        round_border:10,
        dasho:100,
        time:50,
        result:null,
    }
},
computed: {
    // 半径
    radius(){
    return  this.round_size / 2 - this.round_border / 2
    },
    // 形成园
    circleOffset(){
  return this.round_size / 2 
    },
    // 圆周率
     circumference(){
       return this.radius * 2 * Math.PI
     },
    //  圆圈减小
    dashoNumber(){ 
        return this.circumference - this.circumference *  this.dasho / 100
    },

},
methods:{
    activeHandle(){
     let my_set = setInterval(()=>{
            this.dasho-- 
            if(this.dasho <= 0){
         clearInterval(my_set)
          this.dasho = 100
       }
       },this.time)
       this.my_number()
    },
        my_number(){
        this.result = this.time / 10
      let my_set2 =   setInterval(()=>{
              this.result--
        console.log(this.result);
        if(this.result <= 0){
           clearInterval(my_set2)
             this.result = this.time / 10
        }
          },1000)
    
    }
},
mounted(){
    this.result = this.time / 10
}
}
</script>

<style style="scss">
.box {
    width: 120px;
    height: 120px;
position: relative;
    left: 50%; 
   margin-top: 100px;
   transform:  translateX(-50%) rotate(-90deg);
}
 .anim {
    position: absolute;
    left: 0;
   }
   .active {
       position: relative;
       left: 60%;
   }
   .anim_font {
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translateX(-50%) translateY(-50%) rotate(90deg);
       font-size: 80px;
   }
</style>