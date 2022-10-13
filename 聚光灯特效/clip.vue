<template>
  <div>
      <span d="聚光灯效果">聚光灯效果</span>
  </div>
</template>

<script>
export default {

}
</script>

<style>
body {
    background-color: black;
}
div {
    font-size: 50px;
    text-align: center;
}
span {

   color: rgb(94, 92, 92);
 position: relative;
}
span::after {
    /* attr html 的属性名 */
 content: attr(d);
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    clip-path: ellipse(100px 100px at 0% 50%);
    animation: light 5s infinite;
}
@keyframes light {
    0% {
 clip-path: ellipse(60px 140px at 0% 50%);
    }
    50% {
 clip-path: ellipse(60px 140px at 100% 50%);
    }
    100% {
 clip-path: ellipse(60px 140px at 0% 50%);
    }
}
</style>