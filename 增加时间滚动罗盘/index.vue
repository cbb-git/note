<template>
<div>
<div class="clock">
        <div class=" temp year">
            <span></span>
        </div>
        <div class="temp month"></div>
        <div class="temp day"></div>
        <div class="temp hour"></div>
        <div class="temp minute"></div>
        <div class="temp second"></div>
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
    

  },
  mounted(){
        /* 获取元素 */
        /* 因为数量太大所以通过js来创建 */
        let year = document.querySelector('.year');
        let month = document.querySelector('.month');
        let day = document.querySelector('.day');
        let hour = document.querySelector('.hour');
        let minute = document.querySelector('.minute');
        let second = document.querySelector('.second');
        let yearSpan = year.querySelector('span');
        /* 创建时间 倒数第二个参数判断要不要补零*/
        create(13,month,'月',false,1);
        create(31,day,'日',false,1);
        create(24,hour,'时',true,0);
        create(60,minute,'分',true,0);
        create(60,second,'秒',true,0);
        /* 立即执行一次 */
        (timer())
        /* 获取当前时间 */
        setInterval(timer,1000);
        /* 摆成圆形 */
        rot(second,'400px');
        rot(minute,'320px');
        rot(hour,'240px');
        rot(day,'160px');
        rot(month,'100px');
        /* 函数 */
        /* 展示表盘函数 */
        function rot(target,distance) {
            let rotBox = target.children;
            for(let i = 0 ;i < rotBox.length ; i ++ ){
                rotBox[i].style.transform = 'rotate(' + (360 / rotBox.length ) * i + 'deg)' + 'translateX(' + distance + ')' ;
            }
        }
        /* 创建的元素过多，采用建立文档碎片的方式 */
        function create(num,date,target,bool,origin) {
            let fragment = document.createDocumentFragment();
            for(let i = origin; i < num ; i ++) {
                let j = i;
                if(bool){
                    j = j > 9 ? j : '0' + j;
                }
                let span = document.createElement('span');
                span.appendChild(document.createTextNode(j + target));
                fragment.appendChild(span);
            }
            date.appendChild(fragment);
        }
        /* 获取时间 */
        function timer() {
        let time = new Date();
        let nowYear = time.getFullYear();
        let nowMonth = time.getMonth() + 1;
        let nowDay = time.getDate();
        let nowHour = time.getHours();
        let nowMinute = time.getMinutes();
        let nowSecond = time.getSeconds();
        /* 年份直接填 */
        yearSpan.innerHTML = nowYear + '年';
        yearSpan.className = 'now';
        /* 旋转 */
        let rotateH = nowHour * 15 ;
        let rotateM = nowMinute * 6;
        let rotateS = nowSecond * 6;
        let rotateD = (nowDay - 1) * 12;
        let rotateMo = (nowMonth - 1 ) * 30;
        second.style.transform = 'rotate(' + (- rotateS) + 'deg' + ')';
        minute.style.transform = 'rotate(' + (- rotateM) + 'deg' + ')';
        hour.style.transform = 'rotate(' + (- rotateH) + 'deg' + ')';
        day.style.transform = 'rotate(' + (- rotateD) + 'deg' + ')';
        month.style.transform = 'rotate(' + (- rotateMo) + 'deg' + ')';
        /* 更改当前时间的样式 */
        clearClass(month)
        clearClass(day);
        clearClass(hour);
        clearClass(minute);
        clearClass(second);
        month.children[nowMonth - 1].className = 'now';
        day.children[nowDay - 1].className = 'now';
        hour.children[nowHour].className = 'now';
        minute.children[nowMinute].className = 'now';
        second.children[nowSecond].className = 'now';
        }
    /* 清除样式的函数 */
        function clearClass(target) {
            for(let i = 0;i < target.children.length; i++ ) { 
                target.children[i].className = '';
        }
        }

  }
}
</script>
 <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            background-color: rgb(8, 8, 8);
            color: rgb(92, 91, 91);
            font-size: 18px;
        }
        .clock {
            position: absolute;
            left:50%;
            top:50%;
            width: 1000px;
            height: 1000px;
            transform: translate(-50%,-50%);
        }
        .temp {
            position: absolute;
            top: 0;
            width: 1000px;
            height: 1000px;
            transition: all .5s;
        }
        /* 把所有的span定位到一起 */
        .temp span{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 40px;
            height: 20px;
            margin-top: -10px;
            margin-left: -20px;
        }
        span {
            display: block;
        }
        /* 现在的时间变色 */
        .now {
            color: white;
            text-shadow: 0 0 10px white;
        }
        /* 让年份居中显示 */
        .year span {
            font-size: 24px;
            width: 90px;
            margin-left: -35px;
            margin-top: -15px;
        }
    </style>

