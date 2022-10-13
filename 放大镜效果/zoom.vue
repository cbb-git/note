<template>
   <div>
        <div class="choose" ref="choose">
            <div class="content" ref="content" @mousemove="handleMove" @mouseout="handleOut">
                <img src="../assets/logo.png" />
                <div class="shadow" ref="shadow"></div>
            </div>
        </div>
        <div class="larger" ref="larger">
            <img src="../assets/logo.png" ref="big" />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            
        };
    },
    methods: {
        // 获取元素到文档区域的坐标 
        getPosition: function(element){ 
            var dc = document,  
            //  getBoundingClientRect用于获取某个元素相对于视口的位置
            rec = element.getBoundingClientRect();
         
           let x = rec.left;// 获取元素相对浏览器视窗window的左、上坐标 
           let y = rec.top; 
            // 与html或body元素的滚动距离相加就是元素相对于文档区域document的坐标位置 
            x += dc.documentElement.scrollLeft || dc.body.scrollLeft; 
            y += dc.documentElement.scrollTop || dc.body.scrollTop; 
               console.log(dc.documentElement.scrollTop);
            return { 
                left: x, 
                top: y 
            }; 
        },
        handleMove(evt) {
            var larger = this.$refs.larger;
            var shadow = this.$refs.shadow;
            var big = this.$refs.big;
            var pos = this.getPosition(this.$refs.choose);
            var shadowRect = shadow.getBoundingClientRect();
            var bigRect = big.getBoundingClientRect();
            var contentRect = this.$refs.content.getBoundingClientRect();
            var maxX = contentRect.width - shadowRect.width;
            var maxY = contentRect.height - shadowRect.height;
 
            var X = evt.pageX - pos.left - shadowRect.width / 2;
            var Y = evt.pageY - pos.top - shadowRect.height / 2;
 
            if (X <= 0) {
                X = 0;
            }
            if (X >= maxX) {
                X = maxX;
            }
            if (Y <= 0) {
                Y = 0;
            }
            if (Y >= maxY) {
                Y = maxY;
            }
            // 防止遮罩层粘滞，跟随鼠标一起滑出大图位置
            var bigX = X * bigRect.width / contentRect.width;
            var bigY = Y * bigRect.height / contentRect.height;
            //  bigX / bigW = X / contentW,主图和遮罩层之间存在两倍关系，放大图和原图之间也有两倍关系
            shadow.style.left = X + "px";
            shadow.style.top = Y + "px";
 
            // console.log(X, Y, bigX, bigY);
 
            big.style.left = -bigX + "px";
            big.style.top = -bigY + "px";
 
            larger.style.display = "block";
            shadow.style.display = "block";
        },
        handleOut(evt) {
            var larger = this.$refs.larger;
            var shadow = this.$refs.shadow;
            larger.style.display = "none";
            shadow.style.top = "-1000px";
        }
    }
};

</script>

<style>
.choose {
    width: 400px;
    height: 600px;
    float: left;
    margin: 10px 0 0 10px;
}
 
.content {
    width: 400px;
    height: 400px;
    position: relative;
}
 
.content img {
    width: 100%;
    height: 100%;
}
.larger {
    width: 400px;
    border: 1px solid black;
    height: 400px;
    position: absolute;
    /* top: 70px; */
    left: 460px;
    float: left;
    overflow: hidden;
    display: none;
}
 
.larger img {
    width: 800px;
    height: 800px;
    position: absolute;
    left: 0;
    top: 0;
}
 
.shadow {
    width: 200px;
    height: 200px;
    background-color: rgba(145, 200, 200, 0.4);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    display: none;
}

</style>