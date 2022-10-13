<template>
  <div>
    <h2>
      滚动
      <!-- <p>吃我大弯沟</p> -->
    </h2>

    <div id="iphone">
      <div id="hardware"></div>
      <div id="ui">
        <img
          src="https://assets.codepen.io/2002878/iphone12-5g_top_ui.jpg"
          class="top-ui"
          alt=""
        />
        <ul>
          <li v-for="(item,index) in apple" :key="index" ref="list">
            <img
              :src="item"
            />
          </li>
      
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apple: [
        "https://assets.codepen.io/2002878/iphone12-5g_show_01.jpg",
        "https://assets.codepen.io/2002878/iphone12-5g_show_02.jpg",
        "https://assets.codepen.io/2002878/iphone12-5g_show_03.jpg",
        "https://assets.codepen.io/2002878/iphone12-5g_show_04.jpg",
        "https://assets.codepen.io/2002878/iphone12-5g_show_05.jpg",
        "https://assets.codepen.io/2002878/iphone12-5g_show_06.jpg",
        "https://assets.codepen.io/2002878/iphone12-5g_show_07.jpg",
      ],
    };
  },
  mounted() {
    const rows = document.querySelectorAll("#ui ul li");
    const html = document.documentElement;

    document.addEventListener("scroll", (e) => {
        // clientHeight 文本高度
        // scrollTop 距离顶部距离
        // scrollHeight 有滚动条的时候才有意义 表示加上被遮挡的距离
      let scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight);
      let total = 1 / rows.length;
      this.$refs.list.forEach((item,index)=>{
        let start = total * index;
        // console.log(start);
        let end = total * (index + 1);
        let progress = (scrolled - start) / (end - start);
        if (progress >= 1) progress = 1;
        if (progress <= 0) progress = 0;
        // setProperty 方法给样式添加新的样式属性
        item.style.setProperty("--progress", progress);

      })

    //   原生写法 
    //   entries（） 方法返回 值和索引
    //   for (let [index, row] of rows.entries()) {
        
    //     let start = total * index;
    //     let end = total * (index + 1);

    //     let progress = (scrolled - start) / (end - start);
    //     if (progress >= 1) progress = 1;
    //     if (progress <= 0) progress = 0;

    //     row.style.setProperty("--progress", progress);
    //   }
    });
  },
};
</script>

<style>
:root {
  --device-width: 770px;
  --device-height: 1336px;
  --ui-width: 640px;
  font-size: 15px;
}

body {
  background-color: #000;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Helvetica;
  padding: 4rem 0;
}

h2 {
  color: #6e6e73;
  text-align: center;
  font-size: 4.5rem;
  font-weight: 600;
  margin: 6rem 0;
}

h2 p {
  margin: 0;
  color: #fff;
}

#iphone {
  position: relative;
  width: var(--device-width);
  height: var(--device-height);
}

#hardware {
  width: 100%;
  height: 100%;
  background-image: url(https://assets.codepen.io/2002878/iphone12-5g_on_phone.jpg);
  background-size: var(--device-width) var(--device-height);

  mask-image: url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png);
  -webkit-mask-image: url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png);

  mask-size: var(--device-width) var(--device-height);
  -webkit-mask-size: var(--device-width) var(--device-height);
}

#ui {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

#ui .top-ui {
  display: block;
  width: var(--ui-width);
  height: auto;
  margin: 70px auto 0;
  padding-bottom: 30px;
  border-bottom: 1px solid #222;
}

#ui ul {
  list-style: none;
  margin: 0;
  padding: 0;
/* 自定义属性 -- */
  --progress: 0;
}

#ui ul li img {
  display: block;
  width: var(--ui-width);
  height: auto;
  margin: 10px auto;
  padding-bottom: 10px;
  border-bottom: 1px solid #222;
  transform: scale(calc(1.8 - (0.8 * var(--progress))))
    translateY(calc(-60px * (1 - var(--progress))));
  opacity: var(--progress);
}
</style>