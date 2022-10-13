<template>
  <div>
       <div class="box" ref="mybox">
         <div class="children " ref="mychildren">
            <li>1111111111111111111111</li>
            <li>2222222222222222222222</li>
            <li>3333333333333333333333</li>
            <li>4444444444444444444444</li>
            <li>5555555555555555555555</li>
            <li>6666666666666666666666</li>
            <li>7777777777777777777777</li>
            <li>8888888888888888888888</li>
            <li>9999999999999999999999</li>
         </div>
         <div class="children2" ref="mychildren2"></div>
    </div>
  </div>
  
</template>

<script>
export default {
data () {
    return {
       
    }
},
methods:{
timer(){
this.$refs.mybox.scrollTop = 0
setInterval(()=>{
if(this.$refs.mybox.scrollTop >= this.$refs.mychildren.scrollHeight){ 
this.$refs.mybox.scrollTop = 0
}else{
this.$refs.mybox.scrollTop++
}
},500)
}
},
mounted () {
 this.$refs.mychildren2.innerHTML = this.$refs.mychildren.innerHTML
//  this.$refs.mybox.scrollTop = 50
this.timer()

}
}
</script>

<style lang="scss" >
 .box {
     width:200px;
     height: 300px;
     background-color: pink;
     overflow: hidden;
     .children {
   
    //  background-color: red;
     }
      .children2 {
   
    //  background-color: orange;
     }
 }
</style>